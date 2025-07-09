"use client";

import type React from "react";
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
import type { RootState } from "@/store/store";
import { updateClientDetails } from "@/store/invoiceSlice";
import { Users, Mail, Phone, MapPin, Truck } from "lucide-react";

const ClientDetails: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Customer Details
            </CardTitle>
            <CardDescription className="text-gray-600">
              Information about your customer
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="clientName"
              className="text-sm font-medium text-gray-700 flex items-center space-x-2"
            >
              <Users className="h-4 w-4 text-blue-600" />
              <span>Customer Name</span>
            </Label>
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="clientEmail"
              className="text-sm font-medium text-gray-700 flex items-center space-x-2"
            >
              <Mail className="h-4 w-4 text-green-600" />
              <span>Customer Email</span>
            </Label>
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="clientPhone"
              className="text-sm font-medium text-gray-700 flex items-center space-x-2"
            >
              <Phone className="h-4 w-4 text-purple-600" />
              <span>Customer Phone</span>
            </Label>
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="clientGstin"
              className="text-sm font-medium text-gray-700"
            >
              GSTIN/UIN
            </Label>
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="clientStateName"
              className="text-sm font-medium text-gray-700"
            >
              State Name
            </Label>
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="clientStateCode"
              className="text-sm font-medium text-gray-700"
            >
              State Code
            </Label>
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="clientAddress"
            className="text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <MapPin className="h-4 w-4 text-red-600" />
            <span>Customer Address</span>
          </Label>
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
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 min-h-[80px]"
          />
        </div>

        {/* Ship To Section */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <Truck className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Shipping Information
              </h3>
              <p className="text-sm text-gray-600">Delivery address details</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
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
            <Label
              htmlFor="shipToSameAsBilling"
              className="text-sm font-medium text-gray-700"
            >
              Ship to same as billing address
            </Label>
          </div>

          {!invoice.clientDetails.shipToSameAsBilling && (
            <div className="space-y-4 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="shipToName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Ship To Name
                  </Label>
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
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="shipToPhone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Ship To Phone
                  </Label>
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
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="shipToAddress"
                  className="text-sm font-medium text-gray-700"
                >
                  Ship To Address
                </Label>
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
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 min-h-[80px]"
                />
              </div>
              {/* Additional shipping fields remain the same but with enhanced styling */}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientDetails;
