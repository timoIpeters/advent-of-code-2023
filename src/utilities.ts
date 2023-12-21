/* This file bundles some functions in a utility class that could be useful during this years Advent of Code */
import * as fs from 'fs';

export class Utility {
  private static readInputFile(filename: string): string {
    return fs.readFileSync(`../data/${filename}`, 'utf-8');
  }

  public static readInputIntoNumArr(filename: string): number[] {
    let input = this.readInputFile(filename);
    return input.split('\r\n').map(val => +val);
  }

  public static readInputIntoStringArr(filename: string): string[] {
    let input = this.readInputFile(filename);
    return input.split('\r\n');
  }

  public static readInputIntoStringArrSplitByEmptyLine(filename: string): string[] {
    let input = this.readInputFile(filename);
    return input.split(/\n\s*\n/);
  }

  public static splitInputByEmptyLine(filename: string): string[] {
    let input = this.readInputFile(filename);
    return input.split('\r\n\r\n');
  } 
}
