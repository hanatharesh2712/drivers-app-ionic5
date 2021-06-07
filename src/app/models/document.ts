export interface Document {
  id: number;
  market_id: number;
  partner_document_type: PartnerDocumentType;
  partner_document_type_id: number;

}


export interface PartnerDocumentType {
  id: number;
  airport: any;
  airport_id: number;
  description: string;
  document_name: string;
  download_link: string;
  has_exp_date: boolean;
  has_extra_data: boolean;
  has_file: boolean;
  label_extra_data: string;
  notes: string;
  required: boolean;
  seaport: any;
  seaport_id: number;
  show_to_partner: boolean;
  type: number; //1 FOR PARTNER, 2 FOR DRIVER, 3 FOR VEHICLE
  updated_at: Date;
  created_at: Date;
  deleted_at: Date;
}
