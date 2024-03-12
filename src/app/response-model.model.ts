export interface ResponseModel {
    datasets: Dataset[];
    labels: string[];
  }
  
  export interface Dataset {
    data: number[];
    label: string;
  }
  