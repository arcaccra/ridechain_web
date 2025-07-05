import { PaymentsTableList } from "@/components/Payment/PaymentsTableList";

export default function PaymentsManagement() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Payments Management</h1>
      </div>
      <PaymentsTableList />
    </div>
  );
}
