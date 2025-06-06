// Author ----------------------------------------------------------------------

export type AuthorBusinessKey = {
  name: string;
};

export type TransientAuthorData = AuthorBusinessKey;

export type PersistentAuthorData = TransientAuthorData & {
  id: string;
};

export type AuthorData = TransientAuthorData & {
  id?: string;
};

// -----------------------------------------------------------------------------
// Quote -----------------------------------------------------------------------

export type QuoteBusinessKey = {
  text: string;
  authorId?: string;
};

export type TransientQuoteData = QuoteBusinessKey & {
  imageUri?: string;
};

export type PersistentQuoteData = TransientQuoteData & {
  id: string;
};

export type QuoteData = TransientQuoteData & {
  id?: string;
};

export type ExportedQuote = {
  quoteText: string;
  authorName?: string;
};

// -----------------------------------------------------------------------------
