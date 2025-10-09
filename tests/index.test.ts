import { greet } from "../src/index";

describe("greet()", () => {
  it("debería saludar con el nombre correcto", () => {
    expect(greet("Juan")).toBe("Hola, Juan!");
  });

  it("no debe devolver undefined", () => {
    expect(greet("Ana")).not.toBeUndefined();
  });
});
