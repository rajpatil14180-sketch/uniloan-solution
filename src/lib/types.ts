export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "closed";

export interface EligibilityLead {
  id: string;
  type: "eligibility";
  name: string;
  phone: string;
  email: string;
  country: string;
  university: string;
  course: string;
  loanAmount: string;
  familyIncome: string;
  collateral: string;
  status: LeadStatus;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactLead {
  id: string;
  type: "contact";
  name: string;
  phone: string;
  email: string;
  message: string;
  status: LeadStatus;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartnerInquiry {
  id: string;
  type: "partner";
  organizationName: string;
  contactName: string;
  phone: string;
  email: string;
  organizationType: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceLead {
  id: string;
  type: "service";
  service: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ReferralEntry {
  name: string;
  phone: string;
  country: string;
  loanAmount: string;
}

export interface ReferralLead {
  id: string;
  type: "referral";
  name: string;
  phone: string;
  email: string;
  referrals: ReferralEntry[];
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export type Lead = EligibilityLead | ContactLead | PartnerInquiry | ServiceLead | ReferralLead;
