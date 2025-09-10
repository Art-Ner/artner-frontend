// 날짜/시간 표준 포맷 유틸 (ko-KR, Asia/Seoul)

type DateLike = string | number | Date | null | undefined;

function toValidDate(input: DateLike): Date | null {
  if (input === null || input === undefined) return null;
  const d = new Date(input as any);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  }).formatToParts(date);

  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';

  return {
    month: pick('month'), // e.g. "10월"
    day: pick('day'), // e.g. "10"
    dayPeriod: pick('dayPeriod'), // "오전" | "오후"
    hour: pick('hour'), // e.g. "7"
    minute: pick('minute'), // e.g. "30"
  };
}

export function formatDateTime(
  input: DateLike,
  opts?: { timeZone?: string }
): string {
  const tz = opts?.timeZone ?? 'Asia/Seoul';
  const d = toValidDate(input);
  if (!d) return '';
  const { month, day, dayPeriod, hour, minute } = formatParts(d, tz);
  return `${month} ${day}일 ${dayPeriod} ${hour}시 ${minute}분`;
}

export function formatDateRange(
  start: DateLike,
  end: DateLike,
  opts?: { timeZone?: string }
): string {
  const tz = opts?.timeZone ?? 'Asia/Seoul';
  const s = toValidDate(start);
  const e = toValidDate(end);
  if (!s && !e) return '';
  if (s && !e) return formatDateTime(s, { timeZone: tz });
  if (!s && e) return formatDateTime(e, { timeZone: tz });

  // s와 e가 같은 날인지 비교 (로컬 날짜 기준보다는 포맷 결과로 처리 단순화)
  const sStr = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: tz,
  }).format(s as Date);
  const eStr = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: tz,
  }).format(e as Date);

  if (sStr === eStr) {
    // 같은 날일 때: "10월 10일 오후 7시 30분 ~ 오후 9시 00분"
    const sd = s as Date;
    const ed = e as Date;
    const dayPrefix = new Intl.DateTimeFormat('ko-KR', {
      month: 'long',
      day: 'numeric',
      timeZone: tz,
    }).format(sd);

    const sTime = new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: tz,
    }).format(sd);

    const eTime = new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: tz,
    }).format(ed);

    // sTime/eTime 예: "오후 7:30" 형태이므로, 지정 포맷으로 변환
    const sParts = formatParts(sd, tz);
    const eParts = formatParts(ed, tz);
    const sFormatted = `${sParts.dayPeriod} ${sParts.hour}시 ${sParts.minute}분`;
    const eFormatted = `${eParts.dayPeriod} ${eParts.hour}시 ${eParts.minute}분`;
    return `${dayPrefix} ${sFormatted} ~ ${eFormatted}`;
  }

  return `${formatDateTime(s, { timeZone: tz })} ~ ${formatDateTime(e, {
    timeZone: tz,
  })}`;
}
