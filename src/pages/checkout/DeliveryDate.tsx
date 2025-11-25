import dayjs from "dayjs";

function DeliveryDate({
  selectedDeliveryOption,
}: {
  selectedDeliveryOption: any;
}) {
  return (
    <div className="delivery-date">
      Delivery date:{" "}
      {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
        "dddd, MMMM D"
      )}
    </div>
  );
}

export default DeliveryDate;
