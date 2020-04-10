export interface Type<T> extends Function {
  new(...args: any[]): T;
}

export class DomainConverter {
  static fromDto<T>(domain: Type<T>, dto: any) {
    const instance = Object.create(domain.prototype);
    instance.state = dto;
    return instance as T;
  }

  static fromArrayDto<T>(domain: Type<T>, dtoArray: any[]): T[] {
    let array: T[] = []
    dtoArray.forEach(element => {
      let item = this.fromDto<T>(domain, element)
      array.push(item)
    });
    return array
  }

  static toDto<T>(domain: any) {
    return domain.state as T;
  }
}
