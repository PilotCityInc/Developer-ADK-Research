// eslint-disable-next-line import/prefer-default-export
export const HEADER = [
  { text: 'Status', align: 'center', value: 'click', sortable: false, width: '10%' },
  { text: 'Research Item', align: 'start', value: 'resource', width: '55%' },
  { text: 'Required', align: 'center', value: 'required', sortable: false, width: '10%' },
  { text: 'Review', value: 'cta', align: 'center', sortable: false, width: '15%' },
  { text: 'Completed?', align: 'center', value: 'finish', sortable: false, width: '10%' }
];

export const items = [
  { resource: 'Use Case', link: 'test' },
  { resource: 'Case Study', link: 'test1' },
  { resource: 'Article', link: 'test2' },
  { resource: 'Press Release', link: 'test3' },
  { resource: 'Documentation', link: 'test4' }
];

const group = ['Setup', 'Project', 'Screening', 'Internship'];
const required = ['Creator requires this activity', 'Yes', 'No'];
const lockOrder = ['Creator locked activity group and placement order', 'Yes', 'No'];
const deliverable = ['Yes', 'No'];
const notifications = ['Creator turned on by default', 'Turn on', 'Turn off'];
const accessibility = [
  'Creator has turned off accessibility anytime',
  'Creator has turned on accessibility anytime',
  'Yes',
  'No'
];
const endEarly = [
  'Creator has not allowed participants to end early after this activity',
  'Creator has allow end early option only at preset order placement',
  'Yes',
  'No'
];

export { group, required, lockOrder, deliverable, notifications, accessibility, endEarly };
