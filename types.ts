export interface Reference {
  title: string;
  url: string;
}

export interface ArticleContent {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  summary: string;
  coverImage: string;
  content: string[];
  references: Reference[];
  chartData?: any[];
  chartType?: 'bar' | 'line' | 'pie';
}