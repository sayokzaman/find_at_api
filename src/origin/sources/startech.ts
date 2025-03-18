import * as puppeteer from 'puppeteer';
import { ProductType } from 'src/origin/product.type';

export const getDataStarTech = async (
  search?: string,
): Promise<ProductType[]> => {
  const browser: puppeteer.Browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  if (!search) {
    await page.goto(`https://www.startech.com.bd`);
  } else {
    await page.goto(
      `https://www.startech.com.bd/product/search?search=${search}`,
    );
  }

  const data = await page.evaluate(() => {
    const items = document.querySelectorAll('.p-item');
    const results: ProductType[] = [];

    // Loop through each item and extract its inner HTML
    items.forEach((item: HTMLElement) => {
      const name = item
        .querySelector('.p-item-name')
        ?.querySelector('a')?.innerText;

      const link = item
        .querySelector('.p-item-name')
        ?.querySelector('a')
        ?.getAttribute('href');

      const descriptionItems = item
        .querySelector('.short-description')
        ?.querySelector('ul')
        ?.querySelectorAll('li');
      const descriptions: string[] = [];

      descriptionItems?.forEach((li) => descriptions.push(li.innerText));

      const price = item
        .querySelector('.p-item-price')
        ?.querySelectorAll('span');

      const product = {
        name: name ?? '',
        link: link ?? '',
        description: descriptions ?? [],
        price: price ? Array.from(price).map((p) => p.innerText) : [],
      };

      results.push(product);
    });

    return results;
  });

  // Close the browser
  await browser.close();

  // Return the scraped data
  return data;
};
