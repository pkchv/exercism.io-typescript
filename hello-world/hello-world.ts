class HelloWorld {
    static hello(name?: string): string {
        if (name === undefined) {
            return "Hello, World!"
        }

        return "Hello, " + name + "!"
    }
}

export default HelloWorld