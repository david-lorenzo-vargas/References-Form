import { ReferencesDataObject, RelationShipEnum } from "../../Types/types";
import { postData } from "./postReferencesForm";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockData: ReferencesDataObject = {
  personal: {
    first_name: "first name",
    last_name: "last name",
    current_address: "current address",
  },
  employer: [
    {
      name: "employer name",
      start_date: new Date().getTime(),
      end_date: new Date().getTime(),
    },
  ],
  guarantor: {
    name: "guarantor name",
    address: "guarantor address",
    relation: RelationShipEnum.employer,
  },
};

describe("postData", () => {
  it("should post data", async () => {
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: [] }),
      })
    );
    await postData(mockData);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(process.env.POST_URL, {
      body: JSON.stringify(mockData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  });

  it("should throw an error if promise is rejected", async () => {
    mockFetch.mockImplementationOnce(() => Promise.reject());

    await expect(postData(mockData)).rejects.toThrow("Something went wrong");
  });
});
