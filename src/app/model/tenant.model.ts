export class Tenant {
    id: string = '';
    name: string = '';
    code: string = '';
    email: string = '';
    hotLine: string = '';
    city: string = '';
    address: string = '';
    slogan: string = '';
    description: string = '';
    image: string = '';
    connectionString: string = '';

    constructor(init?: Partial<Tenant>) {
        Object.assign(this, init);
    }
}