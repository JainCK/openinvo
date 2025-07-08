import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateClientDetails } from "@/store/invoiceSlice";

const ClientDetails: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Details</CardTitle>
        <CardDescription>Information about your customer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clientName">Customer Name</Label>
            <Input
              id="clientName"
              placeholder="Customer Name"
              value={invoice.clientDetails.name}
              onChange={(e) =>
                dispatch(
                  updateClientDetails({
                    field: "name",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="clientEmail">Customer Email</Label>
            <Input
              id="clientEmail"
              type="email"
              placeholder="customer@example.com"
              value={invoice.clientDetails.email}
              onChange={(e) =>
                dispatch(
                  updateClientDetails({
                    field: "email",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clientPhone">Customer Phone</Label>
            <Input
              id="clientPhone"
              placeholder="(555) 123-4567"
              value={invoice.clientDetails.phone}
              onChange={(e) =>
                dispatch(
                  updateClientDetails({
                    field: "phone",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="clientGstin">GSTIN/UIN</Label>
            <Input
              id="clientGstin"
              placeholder="GSTIN/UIN Number"
              value={invoice.clientDetails.gstin}
              onChange={(e) =>
                dispatch(
                  updateClientDetails({
                    field: "gstin",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="clientStateName">State Name</Label>
              <Input
                id="clientStateName"
                placeholder="State Name"
                value={invoice.clientDetails.stateName}
                onChange={(e) =>
                  dispatch(
                    updateClientDetails({
                      field: "stateName",
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="clientStateCode">State Code</Label>
              <Input
                id="clientStateCode"
                placeholder="State Code"
                value={invoice.clientDetails.stateCode}
                onChange={(e) =>
                  dispatch(
                    updateClientDetails({
                      field: "stateCode",
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="clientAddress">Customer Address</Label>
          <Textarea
            id="clientAddress"
            placeholder="123 Customer St, City, State 12345"
            value={invoice.clientDetails.address}
            onChange={(e) =>
              dispatch(
                updateClientDetails({
                  field: "address",
                  value: e.target.value,
                })
              )
            }
          />
        </div>

        {/* Ship To Section */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="shipToSameAsBilling"
              checked={invoice.clientDetails.shipToSameAsBilling}
              onChange={(e) =>
                dispatch(
                  updateClientDetails({
                    field: "shipToSameAsBilling",
                    value: e.target.checked,
                  })
                )
              }
            />
            <Label htmlFor="shipToSameAsBilling">
              Ship to same as billing address
            </Label>
          </div>

          {!invoice.clientDetails.shipToSameAsBilling && (
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Ship To Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shipToName">Ship To Name</Label>
                  <Input
                    id="shipToName"
                    placeholder="Company or person name"
                    value={invoice.clientDetails.shipToName}
                    onChange={(e) =>
                      dispatch(
                        updateClientDetails({
                          field: "shipToName",
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="shipToPhone">Ship To Phone</Label>
                  <Input
                    id="shipToPhone"
                    placeholder="+91-9876543210"
                    value={invoice.clientDetails.shipToPhone}
                    onChange={(e) =>
                      dispatch(
                        updateClientDetails({
                          field: "shipToPhone",
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="shipToAddress">Ship To Address</Label>
                <Textarea
                  id="shipToAddress"
                  placeholder="Complete shipping address"
                  value={invoice.clientDetails.shipToAddress}
                  onChange={(e) =>
                    dispatch(
                      updateClientDetails({
                        field: "shipToAddress",
                        value: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shipToEmail">Ship To Email</Label>
                  <Input
                    id="shipToEmail"
                    type="email"
                    placeholder="shipping@example.com"
                    value={invoice.clientDetails.shipToEmail}
                    onChange={(e) =>
                      dispatch(
                        updateClientDetails({
                          field: "shipToEmail",
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </div>
                {(invoice.isIndia || invoice.currency === "INR") && (
                  <div>
                    <Label htmlFor="shipToGstin">Ship To GSTIN/UIN</Label>
                    <Input
                      id="shipToGstin"
                      placeholder="22AABCS1234E1Z5"
                      value={invoice.clientDetails.shipToGstin}
                      onChange={(e) =>
                        dispatch(
                          updateClientDetails({
                            field: "shipToGstin",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                )}
              </div>
              {(invoice.isIndia || invoice.currency === "INR") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shipToStateName">Ship To State Name</Label>
                    <Input
                      id="shipToStateName"
                      placeholder="Maharashtra"
                      value={invoice.clientDetails.shipToStateName}
                      onChange={(e) =>
                        dispatch(
                          updateClientDetails({
                            field: "shipToStateName",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipToStateCode">Ship To State Code</Label>
                    <Input
                      id="shipToStateCode"
                      placeholder="27"
                      value={invoice.clientDetails.shipToStateCode}
                      onChange={(e) =>
                        dispatch(
                          updateClientDetails({
                            field: "shipToStateCode",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientDetails;
