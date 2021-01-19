// https://dev.to/_gdelgado/type-safe-error-handling-in-typescript-1p4n
// https://github.com/supermacro/neverthrow/blob/e44023bb9b2865ca0176e427cb95e2520e7e1b44/src/result.ts

export type Result<T, E> = Ok<T, E> | Err<T, E>

export function ok<T, E>(value: T): Ok<T, E> {
    return new Ok(value)
}

export function error<T, E>(err: E): Err<T, E> {
    return new Err(err)
}

export class Ok<T, E> {
    constructor(readonly value: T) { }

    isOk(): this is Ok<T, E> {
        return true
    }

    isErr(): this is Err<T, E> {
        return !this.isOk()
    }

    getResult() { return this.value; }
}

export class Err<T, E> {
    constructor(readonly error: E) { }

    isOk(): this is Ok<T, E> {
        return false
    }

    isErr(): this is Err<T, E> {
        return !this.isOk()
    }


    getResult() { return this.error; }
}
