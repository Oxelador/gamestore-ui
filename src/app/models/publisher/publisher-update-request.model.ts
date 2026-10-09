export interface UpdatePublisherRequest {
  publisher: {
    id: string;
    companyName: string;
    homePage?: string;
    description?: string;
  };
}
