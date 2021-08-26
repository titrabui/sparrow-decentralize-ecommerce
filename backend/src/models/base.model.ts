export class BaseModel {
  convertToJSON(data: any): string {
    return JSON.stringify(data);
  }

  convertToObject(data: any): any {
    return JSON.parse(data);
  }

  convertToNumber(data: any): number {
    return Number(data);
  }

  generateUniqueId(): string {
    return Date.now() + ((Math.random() * 100000).toFixed());
  }
}
