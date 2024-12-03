import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlobService {
  private blobServiceClient: BlobServiceClient;

  constructor() {
    this.blobServiceClient = new BlobServiceClient(`https://${environment.storeAccount}.blob.core.windows.net?${environment.storeKey}`);
  }

  ngOnInit() {
  }

  public getImageUrl(path: string){
    return `https://${environment.storeAccount}.blob.core.windows.net/${environment.storeContainer}/${path}`;
  }

  private containerClient() : ContainerClient {
    return this.blobServiceClient
    .getContainerClient(environment.storeContainer);
  }
}
