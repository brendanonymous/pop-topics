from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time
import json

def run():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    driver.get("https://trends.google.com/trending?geo=US&hours=168&sort=search-volume") # last 7 days, sorted by search volume
    time.sleep(5)  # wait for load

    # get trending topics
    records, trending_items = [], driver.find_elements(By.TAG_NAME, "tr")

    # the first two items are table headers - don't need 'em
    for table_row in trending_items[2:]:
        record = table_row.text.splitlines()
        records.append(record[:2] + [record[3]]) # we only need the search terms, search volume, and the growth

    resp = json.dumps({'records': records})

    driver.quit()

    return resp