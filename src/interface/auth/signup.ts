enum Sex {
    MALE,
    FEMALE
}

export interface SignUpInterface {
  name: string,
  email: string,
  password: string,
  age: number,
  city: string,
  sex: Sex
}