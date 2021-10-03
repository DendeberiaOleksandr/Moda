export class Clothes {
  constructor(public id: string,
              public preview: string,
              public photo: string,
              public cost: number,
              public brand: string,
              public name: string,
              public size: string[],
              public color: string[],
              public published: Date) {
  }
}
