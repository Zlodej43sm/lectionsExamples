var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var User = /** @class */ (function () {
    function User(userName) {
        this.name = userName;
    }
    return User;
}());
var User1 = /** @class */ (function () {
    function User1(userName) {
        this.name1 = userName;
    }
    return User1;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(employeeCompany, userName) {
        var _this = _super.call(this, userName) || this;
        _this.company = employeeCompany;
        return _this;
    }
    return Employee;
}(User));
function getUserName(user) {
    return user.name;
}
debugger;
var alice = new Employee("Microsoft", "Alice");
console.log(getUserName(alice));
console.log(getUserName({ name: "Tom" }));
console.log(getUserName({ name: "Bob", company: "Microsoft" }));
