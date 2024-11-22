#! /usr/bin/env node
/**
 * @file The CLI entrypoint.
 */

/**
 * Sum multiple numbers.
 * @param numbers The numbers to add.
 * @returns The sum of the numbers.
 */
export function sum(...numbers: number[]): number {
  return numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
}
