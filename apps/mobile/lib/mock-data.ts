export type Shop = {
  id: string;
  name: string;
  initials: string;
  area: string;
  addr: string;
  dist: string;
  hours: string;
  open: boolean;
  specialties: string[];
};

export type ServiceType = 'FIXED' | 'STARTING' | 'INSPECTION';

export type Service = {
  id: string;
  name: string;
  cat: string;
  dur: string;
  type: ServiceType;
  price?: string;
  fee?: string;
  desc: string;
};

export type Vehicle = {
  id: string;
  nick: string;
  year: number;
  make: string;
  model: string;
  plate: string;
  miles: string;
  last: string;
};

export type Appointment = {
  id: string;
  shop: string;
  service: string;
  vehicle: string;
  when: string;
  status: string;
  tone: string;
  statusClass: string;
  hasEstimate?: boolean;
  hasInvoice?: boolean;
};

export type EstimateItem = {
  name: string;
  price: string;
};

export type Estimate = {
  shop: string;
  count: number;
  subtotal: string;
  tax: string;
  total: string;
  note: string;
  items: EstimateItem[];
};

export type InvoiceItem = {
  name: string;
  price: string;
};

export type Invoice = {
  ref: string;
  shop: string;
  subtotal: string;
  tax: string;
  total: string;
  dueLabel: string;
  items: InvoiceItem[];
};

export const SHOPS: Shop[] = [
  {
    id: 's1',
    name: 'Grand Street Auto',
    initials: 'GS',
    area: 'Lower East Side',
    addr: '118 Grand St',
    dist: '0.4 mi',
    hours: 'Open · closes 6 PM',
    open: true,
    specialties: ['Oil', 'Brakes', 'Diagnostics'],
  },
  {
    id: 's2',
    name: 'Bushwick Motorworks',
    initials: 'BM',
    area: 'Bushwick, Brooklyn',
    addr: '42 Wyckoff Ave',
    dist: '1.2 mi',
    hours: 'Open · closes 7 PM',
    open: true,
    specialties: ['Tires', 'Suspension', 'EV'],
  },
  {
    id: 's3',
    name: 'Astoria Service Co.',
    initials: 'AS',
    area: 'Astoria, Queens',
    addr: '31-05 Steinway St',
    dist: '2.1 mi',
    hours: 'Closed · opens 8 AM',
    open: false,
    specialties: ['NY Inspection', 'A/C', 'Exhaust'],
  },
];

export const SERVICES: Service[] = [
  {
    id: 'v1',
    name: 'Synthetic Oil Change',
    cat: 'Maintenance',
    dur: '45 min',
    type: 'FIXED',
    price: '$79.99',
    desc: 'Full synthetic oil and filter, up to 5 quarts, plus a complimentary multi-point inspection.',
  },
  {
    id: 'v2',
    name: 'Brake Inspection',
    cat: 'Brakes',
    dur: '30 min',
    type: 'INSPECTION',
    fee: '$49.00',
    desc: 'A technician inspects pads, rotors, calipers and lines, then writes up findings with photos.',
  },
  {
    id: 'v3',
    name: 'Brake Pad Replacement',
    cat: 'Brakes',
    dur: '~2 hr',
    type: 'STARTING',
    price: '$249.00',
    desc: 'Front-axle brake pad replacement. Rotors and hardware are quoted after inspection.',
  },
  {
    id: 'v4',
    name: 'NY State Inspection',
    cat: 'Compliance',
    dur: '40 min',
    type: 'FIXED',
    price: '$37.00',
    desc: 'Official New York State safety and emissions inspection.',
  },
  {
    id: 'v5',
    name: 'Tire Rotation & Balance',
    cat: 'Tires',
    dur: '50 min',
    type: 'FIXED',
    price: '$59.00',
    desc: 'Rotate all four tires and road-force balance for even wear and a smooth ride.',
  },
  {
    id: 'v6',
    name: 'Check-Engine Diagnostic',
    cat: 'Diagnostics',
    dur: '1 hr',
    type: 'INSPECTION',
    fee: '$120.00',
    desc: 'Full diagnostic scan and root-cause analysis. Fee credited toward approved repairs.',
  },
];

export const VEHICLES: Vehicle[] = [
  {
    id: 've1',
    nick: 'The Civic',
    year: 2019,
    make: 'Honda',
    model: 'Civic EX',
    plate: 'JGT-4471',
    miles: '54,210 mi',
    last: 'Mar 2026',
  },
  {
    id: 've2',
    nick: 'Work Van',
    year: 2021,
    make: 'Ford',
    model: 'Transit 250',
    plate: 'NY-88231',
    miles: '82,940 mi',
    last: 'Jun 2026',
  },
];

export const ESTIMATE: Estimate = {
  shop: 'Grand Street Auto',
  count: 3,
  subtotal: '$390.00',
  tax: '$34.61',
  total: '$424.61',
  note: 'Inspection found front rotors scored below minimum thickness and pads at 2mm. We recommend resurfacing the rotors and installing new ceramic pads.',
  items: [
    { name: 'Front brake pads — ceramic', price: '$120.00' },
    { name: 'Front rotors — resurface (2)', price: '$90.00' },
    { name: 'Labor — 1.5 hr', price: '$180.00' },
  ],
};

export const INVOICE: Invoice = {
  ref: '1042',
  shop: 'Astoria Service Co.',
  subtotal: '$97.00',
  tax: '$8.61',
  total: '$105.61',
  dueLabel: 'Amount due',
  items: [
    { name: 'NY State Inspection', price: '$37.00' },
    { name: 'Wiper blades (pair)', price: '$28.00' },
    { name: 'Labor — 0.5 hr', price: '$32.00' },
  ],
};

export const CUSTOMERS = [
  { name: 'Maya Rivera', initials: 'MR', phone: '(917) 555·0148', meta: '2 vehicles · 5 visits' },
  { name: 'Devon Clark', initials: 'DC', phone: '(646) 555·0192', meta: '1 vehicle · 3 visits' },
  { name: 'Priya Nair', initials: 'PN', phone: '(718) 555·0234', meta: '1 vehicle · 8 visits' },
  { name: 'Luis Ortega', initials: 'LO', phone: '(347) 555·0177', meta: '3 vehicles · 12 visits' },
  { name: 'Anna Weiss', initials: 'AW', phone: '(929) 555·0301', meta: '1 vehicle · 2 visits' },
];

export const TEAM = [
  { name: 'Sam Okafor', initials: 'SO', role: 'Owner', roleClass: 'accent', meta: 'You · Active' },
  { name: 'Jordan Lee', initials: 'JL', role: 'Manager', roleClass: 'neutral', meta: 'Active · joined Jan 2026' },
  { name: 'Carlos Diaz', initials: 'CD', role: 'Technician', roleClass: 'neutral', meta: 'Active · joined Mar 2026' },
  { name: 'Renee Fox', initials: 'RF', role: 'Technician', roleClass: 'neutral', meta: 'Active · joined May 2026' },
];

export const INVITATIONS = [
  { name: 'Tomas Silva', contact: '(917) 555·0455', role: 'Technician' },
];

export const OWNER_INVOICES = [
  { ref: '1042', customer: 'Luis Ortega', total: '$105.61', status: 'PAID', statusClass: 'neutral' },
  { ref: '1041', customer: 'Maya Rivera', total: '$424.61', status: 'OPEN', statusClass: 'outline' },
  { ref: '1040', customer: 'Devon Clark', total: '$79.99', status: 'PAID', statusClass: 'neutral' },
  { ref: '1039', customer: 'Priya Nair', total: '$248.00', status: 'PAID', statusClass: 'neutral' },
];

export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$25',
    features: ['Up to 2 employees', 'Appointments & customers', 'In-app payments off'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$50',
    features: ['Up to 8 employees', 'Estimates & approvals', 'Online payments'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$100',
    features: ['Unlimited employees', 'Advanced analytics', 'Custom permissions'],
  },
];

export const OWNER_STATS = [
  { value: '6', label: 'Appointments', sub: 'today' },
  { value: '$1,240', label: 'Revenue', sub: 'today' },
  { value: '2', label: 'Approvals', sub: 'waiting' },
  { value: '1', label: 'Ready', sub: 'pickup' },
];

export const TODAY_SCHEDULE = [
  { time: '9:00', period: 'AM', customer: 'Devon Clark', service: 'Oil Change', vehicle: 'Toyota Camry', status: 'DONE', statusClass: 'neutral', tone: 'neutral' },
  { time: '10:30', period: 'AM', customer: 'Maya Rivera', service: 'Brake Pad Replacement', vehicle: 'Honda Civic', status: 'IN PROGRESS', statusClass: 'accent', tone: 'accent' },
  { time: '11:15', period: 'AM', customer: 'Priya Nair', service: 'Diagnostic', vehicle: 'Subaru Outback', status: 'CHECKED IN', statusClass: 'neutral', tone: 'neutral' },
  { time: '2:00', period: 'PM', customer: 'Luis Ortega', service: 'NY Inspection', vehicle: 'Ford F-150', status: 'CONFIRMED', statusClass: 'neutral', tone: 'neutral' },
  { time: '3:30', period: 'PM', customer: 'Anna Weiss', service: 'Tire Rotation', vehicle: 'VW Golf', status: 'CONFIRMED', statusClass: 'neutral', tone: 'neutral' },
];

export const WEEK_DAYS = [
  { d: 'M', n: '14', appts: 4, today: false },
  { d: 'T', n: '15', appts: 6, today: false },
  { d: 'W', n: '16', appts: 3, today: false },
  { d: 'T', n: '17', appts: 5, today: false },
  { d: 'F', n: '18', appts: 6, today: true },
  { d: 'S', n: '19', appts: 2, today: false },
  { d: 'S', n: '20', appts: 0, today: false },
];

export const TECH_JOBS = [
  { id: 'j1', service: 'Brake Pad Replacement', customer: 'Maya Rivera', vehicle: '2019 Honda Civic EX', bay: 'Bay 2', status: 'IN PROGRESS', statusClass: 'accent', tone: 'accent', primary: true },
  { id: 'j2', service: 'Check-Engine Diagnostic', customer: 'Priya Nair', vehicle: '2020 Subaru Outback', bay: 'Bay 1', status: 'CHECKED IN', statusClass: 'neutral', tone: 'neutral', primary: false },
  { id: 'j3', service: 'Tire Rotation & Balance', customer: 'Anna Weiss', vehicle: '2022 VW Golf', bay: 'Bay 3', status: 'SCHEDULED', statusClass: 'neutral', tone: 'neutral', primary: false },
];

export const TECH_JOB_DETAIL = {
  service: 'Brake Pad Replacement',
  customer: 'Maya Rivera',
  vehicle: '2019 Honda Civic EX',
  plate: 'JGT-4471',
  miles: '54,210 mi',
  bay: 'Bay 2',
  note: 'Customer reports grinding noise when braking at low speed.',
};

export const TECH_NOTIFS = [
  { title: 'Estimate approved', body: 'Maya Rivera approved the brake estimate — $424.61.', when: '5m ago', accent: 'accent' },
  { title: 'New job assigned', body: 'Check-Engine Diagnostic for Priya Nair, Bay 1.', when: '22m ago', accent: 'neutral' },
  { title: 'Parts arrived', body: 'Ceramic pads (Civic) checked in at front desk.', when: '1h ago', accent: 'neutral' },
  { title: 'Schedule updated', body: 'Anna Weiss tire rotation moved to 3:30 PM.', when: '2h ago', accent: 'neutral' },
];

export const TECH_NOTES = [
  { author: 'You', when: '2:46 PM', text: 'Front pads worn to 2mm, rotors scored past minimum. Recommending resurface + ceramic pads.' },
  { author: 'Jordan (Manager)', when: '2:51 PM', text: 'Agreed — build the estimate and send to customer.' },
];

export const TECH_PHOTOS = [
  { cap: 'Front-left rotor', when: '2:42 PM' },
  { cap: 'Worn pad — 2mm', when: '2:44 PM' },
  { cap: 'Caliper', when: '2:45 PM' },
];

export const RECOMMEND_ITEMS = [
  { name: 'Front brake pads — ceramic', price: '$120.00', on: true },
  { name: 'Front rotors — resurface (2)', price: '$90.00', on: true },
  { name: 'Brake fluid flush', price: '$89.00', on: false },
];

export const DEFAULT_APPOINTMENTS: Appointment[] = [
  { id: 'a1', shop: 'Grand Street Auto', service: 'Brake Pad Replacement', vehicle: '2019 Honda Civic EX', when: 'Today · 2:30 PM', status: 'IN PROGRESS', tone: 'accent', statusClass: 'accent', hasEstimate: true },
  { id: 'a2', shop: 'Grand Street Auto', service: 'Synthetic Oil Change', vehicle: '2019 Honda Civic EX', when: 'Thu Jul 24 · 9:00 AM', status: 'CONFIRMED', tone: 'neutral', statusClass: 'neutral', hasEstimate: false },
  { id: 'a3', shop: 'Astoria Service Co.', service: 'NY State Inspection', vehicle: '2021 Ford Transit 250', when: 'Jun 30 · 11:00 AM', status: 'COMPLETED', tone: 'neutral', statusClass: 'neutral', hasEstimate: false, hasInvoice: true },
];

export const TIMELINE = [
  { label: 'Requested', time: 'Mon · 8:10 AM', done: true },
  { label: 'Confirmed', time: 'Mon · 8:12 AM', done: true },
  { label: 'Checked in', time: 'Today · 2:28 PM', done: true },
  { label: 'In progress', time: 'Today · 2:40 PM', current: true, done: true },
  { label: 'Waiting for approval', time: 'Estimate sent', done: false },
  { label: 'Ready for pickup', time: '', done: false },
];

export const PROFILE_ROWS = ['Payment methods', 'Notifications', 'Service history', 'Saved shops', 'Help & support'];

export const TECH_PROFILE_ROWS = ['Availability & shifts', 'Notifications', 'App settings', 'Help & support'];

export const MORE_MENU = [
  ['o_team', 'Team', 'Mechanics, front desk & invitations'],
  ['o_invoices', 'Invoices & payments', 'Billing history'],
  ['o_subscription', 'Subscription', 'Plan & billing'],
  ['o_settings', 'Shop settings', 'Profile, hours & booking'],
  ['o_onboarding', 'Setup checklist', 'Finish setting up'],
];

export const ONBOARD_STEPS = [
  ['profile', 'Add shop profile', 'Name, address & contact'],
  ['hours', 'Set business hours', 'When you accept bookings'],
  ['service', 'Add your first service', 'At least one bookable service'],
  ['team', 'Invite your team', 'Add mechanics & front desk'],
  ['subscription', 'Choose a plan', 'Start your subscription'],
];

export function decorateService(service: Service) {
  const d = { ...service } as Service & {
    badge: string;
    badgeClass: string;
    priceBig: string;
    priceSub: string;
    promiseTitle: string;
    promise: string;
    bookCta: string;
    dueLabel: string;
  };

  if (service.type === 'FIXED') {
    d.badge = 'FIXED PRICE';
    d.badgeClass = 'neutral';
    d.priceBig = service.price!;
    d.priceSub = '';
    d.promiseTitle = 'Exact price, guaranteed';
    d.promise = 'This is the full price for this service. No surprises at pickup.';
    d.bookCta = 'Book — ' + service.price;
    d.dueLabel = 'Total today';
  } else if (service.type === 'STARTING') {
    d.badge = 'STARTING AT';
    d.badgeClass = 'accent';
    d.priceBig = service.price!;
    d.priceSub = 'Final price confirmed after inspection.';
    d.promiseTitle = 'Starting price';
    d.promise = 'You will approve an exact estimate before any work beyond this begins.';
    d.bookCta = 'Book — from ' + service.price;
    d.dueLabel = 'Starting at';
  } else {
    d.badge = 'INSPECTION REQUIRED';
    d.badgeClass = 'outline';
    d.priceBig = service.fee!;
    d.priceSub = 'Inspection fee. Any repair needs your approval first.';
    d.promiseTitle = 'Inspection first';
    d.promise = 'We charge only the inspection fee up front, then send you an estimate to approve before repairs.';
    d.bookCta = 'Book inspection — ' + service.fee;
    d.dueLabel = 'Inspection fee';
  }
  return d;
}

export const SLOT_DAYS = [
  {
    label: 'Today, Jul 18',
    times: ['2:30 PM', '3:15 PM', '4:00 PM', '4:45 PM'],
  },
  {
    label: 'Tomorrow, Jul 19',
    times: ['8:00 AM', '9:30 AM', '11:00 AM', '1:30 PM', '3:00 PM'],
  },
];
