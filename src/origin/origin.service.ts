import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProductType } from 'src/origin/product.type';
import { getDataRyans } from 'src/origin/sources/ryans';
import { getDataStarTech } from 'src/origin/sources/startech';
import { getDataTechLand } from 'src/origin/sources/techland';

@Injectable()
export class OriginService {
  async getData(search?: string): Promise<ProductType[]> {
    try {
      const data: ProductType[] = [];

      data.push(
        ...(await getDataStarTech(search)),
        ...(await getDataRyans(search)),
        ...(await getDataTechLand(search)),
      );

      // if (url === 'https://www.startech.com.bd') {
      //   data = await getDataStarTech(url, search);
      // }

      // if (url === 'https://www.ryans.com') {
      //   data = await getDataRyans(url, search);
      // }

      // if (url === 'https://www.techlandbd.com/') {
      //   data = await getDataTechLand(url, search);
      // }

      return data;
    } catch (error) {
      // Close the browser in case of an error
      // if (browser) {
      //   await browser.close();
      // }

      // Throw an HTTP exception with a meaningful error message
      throw new HttpException(
        `Failed to get data: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
