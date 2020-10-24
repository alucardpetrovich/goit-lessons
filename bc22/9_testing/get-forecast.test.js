const { default: axios } = require("axios");
const { getForecast } = require("../3_web_service_example/web_service");

const expectedToken = "token";
process.env.DARKSKY_API_TOKEN = expectedToken;

describe("getForecast test suite", () => {
  let axiosGetMock;

  const forecastResponse = { data: { temperature: "23.6 C" } };
  const req = { query: { lon: 123.12, lat: 80 } };
  const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

  beforeAll(async () => {
    axiosGetMock = jest.spyOn(axios, "get").mockResolvedValue(forecastResponse);

    await getForecast(req, res);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should call axios.get once", () => {
    expect(axiosGetMock).toBeCalledTimes(1);
    expect(axiosGetMock).toBeCalledWith(
      `https://api.darksky.net/forecast/${expectedToken}/${req.query.lat},${req.query.lon}?exclude=minutely,hourly,daily,alerts,flags`
    );
  });

  it("should call res.status once", () => {
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
  });

  it("should call res.send once", () => {
    expect(res.send).toBeCalledTimes(1);
    expect(res.send).toBeCalledWith(forecastResponse.data);
  });
});
