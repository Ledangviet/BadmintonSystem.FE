export default class BaseResponseModel {
    isSuccess: boolean;
    isFailure: boolean;
    value: any;
    error: {
      code: string;
      message: string;
    };
  
    constructor(data: any) {
      this.isSuccess = data.isSuccess;
      this.isFailure = data.isFailure;
      this.error = data.error;
      this.value = data.value;
    }
  }