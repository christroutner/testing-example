# testing-example

This is an example repository that illustrates the best practices I follow for
writing unit and integration tests for node.js JavaScript applications.

Main features:
- Uses ECMAScript 2015 `Class` for business logic and utility libraries.
- Follows [TDD](https://builttoadapt.io/why-tdd-489fdcdda05e) best practices.
- Uses `_this` to maintain context to the instance of the class.
- Uses [Sinon stubs](https://sinonjs.org/releases/latest/stubs/) to mock external dependencies for unit tests.
- Each function is wrapped in try/catch statements, allowing thrown errors to 'bubble up' to the top-level function, and give every function along the way an opportunity to handle exceptions.
- Testing assertions focus on properties and structure, not values.
