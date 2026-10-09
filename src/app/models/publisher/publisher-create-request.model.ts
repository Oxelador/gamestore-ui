export interface CreatePublisherRequest {
  publisher: {
    companyName: string;
    homePage?: string;
    description?: string;
  };
}
