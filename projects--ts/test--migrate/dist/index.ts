interface IUser {
    name: string;
}
class User {
    name: string;
    constructor(userName: string) {
        this.name = userName;
    }
}

class User1 {
    name1: string;
    constructor(userName: string) {
        this.name1 = userName;
    }
}
class Employee extends User {
    company: string;
    constructor(employeeCompany: string, userName: string) {
        super(userName);
        this.company = employeeCompany;
    }
}

function getUserName(user: IUser): string {
    return user.name;
}
debugger;
let alice: User = new Employee("Microsoft", "Alice");
console.log(getUserName(alice));

console.log(getUserName({ name: "Tom" }));
console.log(getUserName(<Employee>{ name: "Bob", company:"Microsoft" }));