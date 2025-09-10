export type TossRequest = {
  amount: number;
  orderId: string;
  orderName: string;
  customerName?: string;
  successUrl: string;
  failUrl: string;
};

// 결제 페이지 리다이렉트 방식 (Widget/SDK 간소화)
export function requestTossPayment(params: TossRequest) {
  const base = 'https://api.tosspayments.com/v1/payments/authorize';
  const url = new URL(base);
  Object.entries(params).forEach(([k, v]) =>
    url.searchParams.set(k, String(v))
  );
  window.location.href = url.toString();
}
