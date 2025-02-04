const {
  getRandomQuote,
  sendInspirationalQuote,
} = require("../src/send_inspiration");
const quotesData = require("../src/quotes.json");
const nodemailer = require("nodemailer");
const originalQuotesData = { ...quotesData };

describe("send random inspirational quote", function () {
  let transporterSpy;

  beforeEach(() => {
    quotesData.quotes = [
      { quote: "Believe in yourself.", author: "Anonymous" },
      { quote: "You are stronger than you think.", author: "Unknown" },
      { quote: "Every moment is a fresh beginning.", author: "T.S. Eliot" },
    ];

    transporterSpy = jasmine.createSpyObj("transporter", ["sendMail"]);
    spyOn(nodemailer, "createTransport").and.returnValue(transporterSpy);
  });

  afterEach(() => {
    Object.assign(quotesData, originalQuotesData);
  });

  describe("getRandomQuote", () => {
    it("should return a formatted quote from quotesData", () => {
      const quote = getRandomQuote();
      expect(quote).toMatch(/"(.+?)" - (.+)/);
    });

    it("should return one of the mocked quotes", () => {
      const quote = getRandomQuote();
      expect(quote).toEqual(
        jasmine.stringMatching(
          /"Believe in yourself." - Anonymous|"You are stronger than you think." - Unknown|"Every moment is a fresh beginning." - T.S. Eliot/
        )
      );
    });
    it("should ensure that the quote is formatted correctly", () => {
      const quote = getRandomQuote();
      expect(quote).toEqual(jasmine.stringMatching(/".+" - .+/));
    });
  });

  describe("sendInspirationalQuote", () => {
    it("should send an email with a random quote with correct arguments", async () => {
      const recipientEmail = "email@gmail.com";
      transporterSpy.sendMail.and.resolveTo({});

      await sendInspirationalQuote(recipientEmail);

      expect(transporterSpy.sendMail).toHaveBeenCalledTimes(1);
      const mailOptions = transporterSpy.sendMail.calls.mostRecent().args[0];
      expect(mailOptions.to).toBe(recipientEmail);
      expect(mailOptions.subject).toBe("Your Inspirational Quote Of The Day");
      expect(mailOptions.text).toMatch(/"(.+?)" - (.+)/);
    });

    it("should handle errors when sending email", async () => {
      const recipientEmail = "email@gmail.com";
      transporterSpy.sendMail.and.rejectWith(new Error("Email failed"));
      await expectAsync(
        sendInspirationalQuote(recipientEmail)
      ).toBeRejectedWithError("Error sending email: Email failed");
    });

    it("should throw an error if the recipient email is invalid", async () => {
      const recipientEmail = "mocked-email";
      await expectAsync(
        sendInspirationalQuote(recipientEmail)
      ).toBeRejectedWithError("Please provide a valid email address.");
    });
    it("should throw an error if the recipient email is not provided", async () => {
      await expectAsync(sendInspirationalQuote()).toBeRejectedWithError(
        "Your email address is required."
      );
    });
  });
});

