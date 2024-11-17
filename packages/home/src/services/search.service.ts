import { Injectable } from '@nailyjs/ioc'
import { SearchError, SearchValue } from '../common'
import { SearchRequestService } from './search-request.service'

interface NpmSearchResult {
  objects: {
    package: {
      name: string
      version: string
      description: string
      keywords: string[]
    }
  }[]
  total: number
}

@Injectable()
export class SearchService {
  constructor(private readonly searchRequestService: SearchRequestService) {}

  private handleError(err: unknown): SearchError {
    console.log('SearchService error:', err)
    return {
      type: 'error',
      message: err instanceof Error ? err.message : String(err),
    }
  }

  private async searchInNpm(keywords: string, options: Record<string, any>, type: 'npm' | 'taobao'): Promise<SearchValue> {
    try {
      const { data } = await this.searchRequestService.getAxios().get<NpmSearchResult>(`https://registry.${type === 'npm' ? 'npmjs.org' : 'npmmirror.com'}/-/v1/search`, {
        params: {
          ...options,
          text: keywords,
          timestamp: Date.now(),
        },
      })
      return data.objects.map(v => ({
        type: 'npm',
        name: v.package.name,
        version: v.package.version,
        description: v.package.description,
        keywords: v.package.keywords,
        href: `${type === 'npm' ? 'https://www.npmjs.com' : 'https://npmmirror.com'}/package/${v.package.name}`,
        total: data.total,
      }))
    }
    catch (e) {
      return this.handleError(e)
    }
  }

  async search(type: 'npm' | 'github' | 'taobao', keywords: string, options: Record<string, any>): Promise<SearchValue> {
    if (type === 'npm' || type === 'taobao') return await this.searchInNpm(keywords, options, type)
  }
}
