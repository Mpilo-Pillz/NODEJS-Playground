const momoUrl = process.env.MOBILE_MONEY_PAY_URL;

const authenticateWithMoMoService = async () => {
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: process.env.MOMO_USER,
      password: process.env.MOMO_PASSWORD,
    }),
  };

  try {
    const momoToken = await fetch(`${momoUrl}/auth/`, config);
    return momoToken;
  } catch (error) {}
};

const requestToPay = async (amount: number, cellphoneNumber: string) => {
  try {
    const accessTokenResponse = await authenticateWithMoMoService();
    let accessToken;
    if (!accessTokenResponse) {
      return { status: 401, message: "Payment unsuccessful" };
      //   res.status(404).json({message: "Unauthorized"});
    }

    accessToken = await accessTokenResponse?.json();

    // Request to pay
    const requestToPayConfig = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.access_token}`,
      },
      body: JSON.stringify({
        amount,
        currency: "EUR",
        externalId: "6353636",
        payer: {
          partyIdType: "MSISDN",
          partyId: cellphoneNumber,
        },
        payerMessage: "Paying utility bill",
        payeeNote: "payer note",
      }),
    };

    const requestToPayResponse = await fetch(
      `${momoUrl}/collection/request-to-pay`,
      requestToPayConfig
    );

    // res.status(202).json(await requestToPay.json());
    return requestToPayResponse.json();
  } catch (error) {}
};

export { authenticateWithMoMoService, requestToPay };
