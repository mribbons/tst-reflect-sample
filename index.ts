import { getType } from "tst-reflect";

export default interface IService
{
    typedMethod<T>(a: any): void
}

export class Service implements IService
{
    printTypeProperties<TType>()
    {
      const type = getType<TType>(); // <<== get type of generic TType
      
      console.log(type.getProperties().map(prop => prop.name + ": " + prop.type.name).join("\n"));
    }

    typedMethod<T>(a: any): void {
      const type = getType<T>();
      console.log(`type.name: ${type.name}`);

      this.printTypeProperties<T>();
    }
}

export class MyType {
    member: string = "hello";
}

export class Tester
{
    testGeneric(): void
    {
        var mt = new MyType();
        var service = new Service();
        var _interface: IService = service as IService;

        service.typedMethod<MyType>({});
        _interface.typedMethod<MyType>({});

    }
}

new Tester().testGeneric();
