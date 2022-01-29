const args = process.argv.slice(2);

// 1. first argument - command name
// 2. parse next arguments as options
// 3. match command handler with command name

const commands = {
  add: addNumbers,
};
const commandNames = Object.keys(commands);

const commandName = args[0];
if (!commandNames.includes(commandName)) {
  throw new Error("no such command");
}

const options = parseOptions(args.slice(1));

commands[commandName](options);

function parseOptions(options) {
  const { parsedOptions } = options.reduce(
    (acc, option) => {
      if (acc.argumentName) {
        acc.parsedOptions[acc.argumentName] = option;
        acc.argumentName = null;
        return acc;
      }
      if (!option.startsWith("--")) {
        return acc;
      }
      if (option.includes("=")) {
        const [name, value] = option.split("=");
        const parsedName = name.replace(/^--/, "");
        acc.parsedOptions[parsedName] = value;
        return acc;
      }

      acc.argumentName = option.replace(/^--/, "");
      return acc;
    },
    {
      parsedOptions: {},
      argumentName: null,
    }
  );

  return parsedOptions;
}

function addNumbers(options) {
  const { num1, num2 } = options;
  if (num1 === undefined || num2 === undefined) {
    throw new Error("num1 or num2 was not provided");
  }

  console.log("The sum is =", parseFloat(num1) + parseFloat(num2));
}
