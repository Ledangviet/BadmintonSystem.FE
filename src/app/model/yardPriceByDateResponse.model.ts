import BaseResponseModel from "./base.response.model";
import { YardModel } from "./yard.model";
import { YardPriceModel } from "./yardPrice.model";

export class YardPriceByDateModel{
    yard: YardModel;
    yardPricesDetails: YardPriceModel[];

    constructor(yard: YardModel, yardPricesDetails: YardPriceModel[]) {
        this.yard = yard;
        this.yardPricesDetails = yardPricesDetails;
    }
}

export class YardPriceByDateResponseModel extends BaseResponseModel {
    override value : YardPriceByDateModel;

    constructor(data: any) {
        super(data);
        this.value = data.value;
    }
}