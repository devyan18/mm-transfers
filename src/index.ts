export function greet(name: string): string {
  return `Hola, ${name}!`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(greet("mundo"));
}
