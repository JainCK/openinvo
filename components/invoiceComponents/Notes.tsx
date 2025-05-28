import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateNotes } from "@/store/invoiceSlice";

const Notes: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes & Terms</CardTitle>
        <CardDescription>
          Additional notes or terms and conditions (optional)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Payment terms, additional notes, or terms and conditions..."
          rows={4}
          value={invoice.notes}
          onChange={(e) => dispatch(updateNotes(e.target.value))}
        />
      </CardContent>
    </Card>
  );
};

export default Notes;
