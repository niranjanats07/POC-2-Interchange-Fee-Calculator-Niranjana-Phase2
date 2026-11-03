
import os
import re
from pathlib import Path

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait, Select


# =========================================================
# CONFIGURATION
# =========================================================

BASE_URL = os.getenv(
    "BASE_URL",
    "https://poc-2-interchange-fee-frontend.onrender.com"
).rstrip("/")

REPORT = Path("test-results/reports/Test_Report.txt")
SCREENSHOT_DIR = Path("test-results/screenshots")

DESKTOP_SCREENSHOT = SCREENSHOT_DIR / "discussion4-desktop.png"
MOBILE_SCREENSHOT = SCREENSHOT_DIR / "discussion4-mobile.png"
FAILURE_SCREENSHOT = SCREENSHOT_DIR / "discussion4-failure.png"


# =========================================================
# HELPER FUNCTIONS
# =========================================================

def total_fee_value(driver):
    """Read the value specifically from the TOTAL FEE card."""

    cards = driver.find_elements(
        By.CSS_SELECTOR,
        ".result-card"
    )

    for card in cards:
        match = re.search(
            r"TOTAL\s+FEE\s*[\r\n:]*\s*₹?\s*([0-9,]+(?:\.\d{1,2})?)",
            card.text,
            re.IGNORECASE
        )

        if match:
            return float(
                match.group(1).replace(",", "")
            )

    raise AssertionError(
        "Could not find TOTAL FEE value. "
        f"Visible cards: {[card.text for card in cards]}"
    )


def wait_for_fee(driver, expected_fee, timeout=45):
    """Wait until the displayed total fee matches the expected value."""

    def fee_matches(current_driver):
        try:
            actual_fee = total_fee_value(current_driver)
            return abs(actual_fee - expected_fee) < 0.01
        except Exception:
            return False

    try:
        WebDriverWait(driver, timeout).until(
            fee_matches
        )

    except Exception as error:
        cards = [
            element.text
            for element in driver.find_elements(
                By.CSS_SELECTOR,
                ".result-card"
            )
        ]

        raise AssertionError(
            f"Expected total fee INR {expected_fee:.2f}. "
            f"Visible result cards: {cards}. "
            f"Page title: {driver.title}. "
            f"Current URL: {driver.current_url}. "
            f"Original error: {error}"
        )


def find_form_control(driver, label_text, control_type):
    """Find an input or select control using its visible label."""

    labels = driver.find_elements(
        By.XPATH,
        f"//label[contains("
        f"translate(normalize-space(.),"
        f" 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',"
        f" 'abcdefghijklmnopqrstuvwxyz'),"
        f" '{label_text.lower()}')]"
    )

    for label in labels:

        field_id = label.get_attribute("for")

        if field_id:
            matches = driver.find_elements(
                By.ID,
                field_id
            )

            for element in matches:
                if element.tag_name.lower() == control_type:
                    return element

        matches = label.find_elements(
            By.XPATH,
            f".//{control_type}"
        )

        if matches:
            return matches[0]

        matches = label.find_elements(
            By.XPATH,
            f"following::{control_type}[1]"
        )

        if matches:
            return matches[0]

    raise AssertionError(
        f"Could not find {control_type} "
        f"for label '{label_text}'."
    )


def field_input(driver, label_text):
    return find_form_control(
        driver,
        label_text,
        "input"
    )


def field_select(driver, label_text):
    return find_form_control(
        driver,
        label_text,
        "select"
    )


def write_report(results, failure=None):
    """Generate the Selenium execution report."""

    passed = sum(
        1 for result in results
        if result.startswith("PASS")
    )

    failed = sum(
        1 for result in results
        if result.startswith("FAIL")
    )

    overall = (
        "PASS"
        if failure is None and failed == 0
        else "FAIL"
    )

    lines = [
        "Discussion #4 - Selenium Quality Gate",
        f"Application: {BASE_URL}",
        "Browser: Google Chrome",
        "Automation: Selenium WebDriver 4",
        f"Execution Result: {overall}",
        "",
        "TEST RESULTS",
        "============",
        ""
    ]

    lines.extend(results)

    lines.extend([
        "",
        "EXECUTION SUMMARY",
        "=================",
        f"Passed checks: {passed}",
        f"Failed checks: {failed}",
        f"Overall result: {overall}",
        "",
        "EVIDENCE FILES",
        "==============",
        f"Desktop screenshot: {DESKTOP_SCREENSHOT}",
        f"Mobile screenshot: {MOBILE_SCREENSHOT}",
    ])

    if failure:
        lines.extend([
            "",
            "FAILURE DETAILS",
            "===============",
            f"{type(failure).__name__}: {failure}"
        ])

    REPORT.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    REPORT.write_text(
        "\n".join(lines),
        encoding="utf-8"
    )


# =========================================================
# SELENIUM END-TO-END TEST
# =========================================================

@pytest.mark.selenium
def test_discussion4_live_quality_gate():

    REPORT.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    SCREENSHOT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    results = []
    driver = None
    failure = None

    try:

        # -------------------------------------------------
        # BROWSER CONFIGURATION
        # -------------------------------------------------

        options = webdriver.ChromeOptions()

        options.add_argument("--headless=new")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1440,1000")

        driver = webdriver.Chrome(
            options=options
        )

        wait = WebDriverWait(
            driver,
            45
        )

        # -------------------------------------------------
        # TEST 1: LIVE APPLICATION PAGE LOAD
        # -------------------------------------------------

        driver.get(BASE_URL)

        wait.until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "//h1[contains(.,'Interchange Fee Intelligence')]"
                )
            )
        )

        wait.until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "//*[normalize-space()='SCENARIO READY']"
                )
            )
        )

        results.append(
            "PASS - Dashboard page load"
        )

        # -------------------------------------------------
        # TEST 2: FRONTEND-TO-BACKEND API HANDSHAKE
        # -------------------------------------------------

        handshake = driver.execute_async_script(
            """
            const callback = arguments[arguments.length - 1];

            fetch("/api/calculate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    transaction_amount: 1000,
                    card_type: "Credit Card",
                    mcc: "Retail",
                    channel: "Online",
                    geography: "India",
                    interchange_rate: 1.8,
                    processor_fee: 0.3
                })
            })
            .then(async response => {
                const body = await response.json();

                callback({
                    ok: response.ok,
                    status: response.status,
                    data: body
                });
            })
            .catch(error => {
                callback({
                    ok: false,
                    error: String(error)
                });
            });
            """
        )

        assert handshake.get("ok") is True, (
            f"Frontend API request failed: {handshake}"
        )

        assert handshake.get("status") == 200, (
            f"Unexpected API status: {handshake}"
        )

        api_data = handshake["data"]

        assert abs(
            float(api_data["total_fee"]) - 24.0
        ) < 0.01, (
            f"Unexpected total fee: {api_data}"
        )

        results.append(
            "PASS - Frontend-to-backend API handshake: "
            "HTTP 200, total fee INR 24.00"
        )

        # -------------------------------------------------
        # TEST 3: INITIAL CALCULATION
        # -------------------------------------------------

        wait_for_fee(
            driver,
            24.00
        )

        results.append(
            "PASS - Initial calculation: total fee INR 24.00"
        )

        # -------------------------------------------------
        # TEST 4: VISUALIZATION RENDERING
        # -------------------------------------------------

        chart = wait.until(
            EC.visibility_of_element_located(
                (
                    By.CSS_SELECTOR,
                    ".chart-wrap svg"
                )
            )
        )

        assert chart.is_displayed()

        results.append(
            "PASS - Recharts visualization rendered"
        )

        driver.save_screenshot(
            str(DESKTOP_SCREENSHOT)
        )

        results.append(
            "PASS - Desktop screenshot captured"
        )

        # -------------------------------------------------
        # TEST 5: TRANSACTION AMOUNT INTERACTION
        # -------------------------------------------------

        amount = field_input(
            driver,
            "Transaction amount"
        )

        amount.clear()
        amount.send_keys("2000")

        wait_for_fee(
            driver,
            48.00
        )

        results.append(
            "PASS - Amount interaction: INR 2,000 gives INR 48.00"
        )

        # -------------------------------------------------
        # TEST 6: CARD TYPE INTERACTION
        # -------------------------------------------------

        card_type = field_select(
            driver,
            "Card type"
        )

        Select(card_type).select_by_visible_text(
            "Debit Card"
        )

        wait_for_fee(
            driver,
            40.00
        )

        results.append(
            "PASS - Debit Card interaction: total fee INR 40.00"
        )

        # -------------------------------------------------
        # TEST 7: PARTICIPANT INTELLIGENCE PANEL
        # -------------------------------------------------

        participant = wait.until(
            EC.element_to_be_clickable(
                (
                    By.CSS_SELECTOR,
                    ".rail-node"
                )
            )
        )

        participant.click()

        panel = wait.until(
            EC.visibility_of_element_located(
                (
                    By.CSS_SELECTOR,
                    '[role="dialog"][aria-label="Participant intelligence"]'
                )
            )
        )

        assert panel.is_displayed()

        results.append(
            "PASS - Participant intelligence panel opens"
        )

        close_panel = wait.until(
            EC.element_to_be_clickable(
                (
                    By.CSS_SELECTOR,
                    '[aria-label="Close intelligence panel"]'
                )
            )
        )

        close_panel.click()

        wait.until(
            EC.invisibility_of_element_located(
                (
                    By.CSS_SELECTOR,
                    '[role="dialog"][aria-label="Participant intelligence"]'
                )
            )
        )

        results.append(
            "PASS - Participant intelligence panel closes"
        )

        # -------------------------------------------------
        # TEST 8: PROJECT INFORMATION AND SIGNATURE
        # -------------------------------------------------

        info_button = wait.until(
            EC.element_to_be_clickable(
                (
                    By.CSS_SELECTOR,
                    '[aria-label="Project information"]'
                )
            )
        )

        info_button.click()

        info_modal = wait.until(
            EC.visibility_of_element_located(
                (
                    By.CSS_SELECTOR,
                    '[role="dialog"][aria-label="Project information"]'
                )
            )
        )

        assert info_modal.is_displayed()

        wait.until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "//*[contains("
                    "translate(normalize-space(.),"
                    " 'abcdefghijklmnopqrstuvwxyz',"
                    " 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),"
                    " 'NIRANJANA T SURESH')]"
                )
            )
        )

        results.append(
            "PASS - Project information and developer signature"
        )

        close_info = wait.until(
            EC.element_to_be_clickable(
                (
                    By.CSS_SELECTOR,
                    '[aria-label="Close project information"]'
                )
            )
        )

        close_info.click()

        wait.until(
            EC.invisibility_of_element_located(
                (
                    By.CSS_SELECTOR,
                    '[role="dialog"][aria-label="Project information"]'
                )
            )
        )

        # -------------------------------------------------
        # TEST 9: RESPONSIVE MOBILE LAYOUT
        # -------------------------------------------------

        driver.set_window_size(
            390,
            844
        )

        wait.until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "//h1[contains(.,'Interchange Fee Intelligence')]"
                )
            )
        )

        amount_mobile = field_input(
            driver,
            "Transaction amount"
        )

        assert amount_mobile.is_displayed()

        horizontal_overflow = driver.execute_script(
            """
            return document.documentElement.scrollWidth >
                   document.documentElement.clientWidth;
            """
        )

        assert not horizontal_overflow, (
            "Horizontal overflow detected at 390px viewport."
        )

        results.append(
            "PASS - Responsive mobile layout at 390px"
        )

        driver.save_screenshot(
            str(MOBILE_SCREENSHOT)
        )

        results.append(
            "PASS - Mobile screenshot captured"
        )

    except Exception as error:

        failure = error

        results.append(
            f"FAIL - {type(error).__name__}: {error}"
        )

        if driver:
            try:
                driver.save_screenshot(
                    str(FAILURE_SCREENSHOT)
                )
            except Exception:
                pass

    finally:

        write_report(
            results,
            failure
        )

        if driver:
            driver.quit()

    if failure:
        raise failure
