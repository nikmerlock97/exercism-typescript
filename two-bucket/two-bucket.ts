'use strict'

class Bucket {
  public static One: string = 'one'
  public static Two: string = 'two'
  private contains: number = 0

  public constructor (
    public readonly capacity: number,
    public readonly name: string
  ) {}

  public get amount (): number {
    return this.contains
  }

  public set amount (amount: number) {
    if (amount > this.capacity) {
      throw new Error('Bucket overflow')
    }
    if (amount < 0) {
      throw new Error('Cant pour from empty')
    }
    this.contains = amount
  }

  public amountLeft (): number {
    return this.capacity - this.contains
  }

  public fill (): void {
    this.contains = this.capacity
  }

  public isFilled (): boolean {
    return this.capacity === this.contains
  }

  public empty (): void {
    this.contains = 0
  }

  public isEmpty (): boolean {
    return 0 === this.contains
  }
}

class TwoBucket {
  private bucketOne: Bucket
  private bucketTwo: Bucket
  private moveCount: number = 0
  private goalBuck: string = ''

  public constructor (
    buckOne: number,
    buckTwo: number,
    private readonly goal: number,
    private readonly starterBuck: string
  ) {
    const starterBuckOne: boolean = starterBuck === Bucket.One
    this.bucketOne = new Bucket(
      starterBuckOne ? buckOne : buckTwo,
      starterBuckOne ? Bucket.One : Bucket.Two
    )
    this.bucketTwo = new Bucket(
      starterBuckOne ? buckTwo : buckOne,
      starterBuckOne ? Bucket.Two : Bucket.One
    )
  }

  private transfer (): void {
    do {
      if (this.bucketOne.isEmpty()) {
        this.bucketOne.fill()
      } else if (!this.bucketTwo.isFilled()) {
        this.pour(this.bucketOne, this.bucketTwo)
      } else {
        this.bucketTwo.empty()
      }

      this.moveCount++
    } while (
      this.bucketOne.amount !== this.goal &&
      this.bucketTwo.amount !== this.goal
    )

    this.goalBuck =
      this.bucketOne.amount === this.goal
        ? this.bucketOne.name
        : this.bucketTwo.name
  }

  private pour (bucketFrom: Bucket, bucketTo: Bucket): void {
    let pourAmount: number = 0
    if (bucketFrom.amount >= bucketTo.amountLeft()) {
      pourAmount = bucketTo.amountLeft()
    } else {
      pourAmount = bucketFrom.amount
    }
    bucketFrom.amount = bucketFrom.amount - pourAmount
    bucketTo.amount = bucketTo.amount + pourAmount
  }

  public moves (): number {
    if (!this.moveCount) {
      this.transfer()
    }
    return this.moveCount
  }

  public get goalBucket (): string {
    return this.goalBuck
  }

  public get otherBucket (): number {
    return (this.goalBuck === this.bucketOne.name
      ? this.bucketTwo
      : this.bucketOne
    ).amount
  }
}

export { Bucket, TwoBucket }
