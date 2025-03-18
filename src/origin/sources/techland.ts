import * as puppeteer from 'puppeteer';
import { ProductType } from 'src/origin/product.type';

export const getDataTechLand = async (
  search?: string,
): Promise<ProductType[]> => {
  const browser: puppeteer.Browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  if (!search) {
    await page.goto(`https://www.techlandbd.com/`);
  } else {
    await page.goto(
      `https://www.techlandbd.com/index.php?route=product/search&search=${search}`,
    );
  }

  const data = await page.evaluate(() => {
    const items = document.querySelectorAll('.product-layout');
    const results: ProductType[] = [];

    // Loop through each item and extract its inner HTML
    items.forEach((item: HTMLElement) => {
      const name = (
        item.querySelector('.name')?.querySelector('a') as HTMLAnchorElement
      ).innerText;

      const link = item
        .querySelector('.name')
        ?.querySelector('a')
        ?.getAttribute('href');

      const descriptionItems = item.querySelector(
        '.description',
      ) as HTMLDivElement;
      let descriptions: string[] = [];

      if (descriptionItems) {
        const items = descriptionItems.querySelectorAll('li');

        if (items) {
          items?.forEach((li) => descriptions.push(li.innerText));
        } else {
          //   descriptions.push(descriptionItems.innerText);
          descriptions = [descriptionItems.innerText];
          console.log(descriptionItems.innerText);
        }
      }

      const price = item.querySelector('.price')?.querySelectorAll('span');

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
