import * as puppeteer from 'puppeteer';
import { ProductType } from 'src/origin/product.type';

export const getDataRyans = async (search?: string): Promise<ProductType[]> => {
  const browser: puppeteer.Browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  if (!search) {
    await page.goto(`https://www.ryans.com`);
  } else {
    await page.goto(`https://www.ryans.com/search?q=${search}`);
  }

  const data = await page.evaluate(() => {
    const main = document.querySelector('.product-home-card');
    const results: ProductType[] = [];

    if (main) {
      const items = Array.from(main.children) as HTMLElement[];

      items.forEach((item: HTMLElement) => {
        const name = item
          .querySelector('.card-text')
          ?.querySelector('a')?.innerText;

        const link = item
          .querySelector('.card-text')
          ?.querySelector('a')
          ?.getAttribute('href');

        const price: string[] = [];

        let itemPriceElement = item.querySelector('.pr-text');

        if (!itemPriceElement) {
          itemPriceElement = item.querySelector('.sp-text');
        }
        if (itemPriceElement) {
          const itemPrice = itemPriceElement as HTMLParagraphElement;
          price.push(itemPrice.innerText ?? '');
        }

        const product = {
          name: name ?? '',
          link: link ?? '',
          price: price ?? [],
        };

        results.push(product);
      });
    }

    return results;
  });

  // Close the browser
  await browser.close();

  // Return the scraped data
  return data;
};
