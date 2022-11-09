export interface Config {
  port: number;
}

export function getConfig(): Config {
  return {
    port: parseInt(process.env.PORT || "3000"),
  };
}
