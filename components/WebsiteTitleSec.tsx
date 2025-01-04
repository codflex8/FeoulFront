import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const WebsiteTitleSec = ({projectId, blockNumber}: {projectId?: string, blockNumber?: number}) => {
  const t = useTranslations('MapPage');

  return (
    <div className="bg-slate-600 rounded-md px-4 py-3 mb-4 flex items-center gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {/* <BreadcrumbLink> */}
            <Link href="/">
              <Image
                src='/assets/icons/logo.svg'
                alt="logo"
                width={70}
                height={32}
              />
            </Link>
            {/* </BreadcrumbLink> */}
          </BreadcrumbItem>
          <Badge variant="secondary">{t("JaddahCity")}</Badge>
          {projectId && (
            <>
              <BreadcrumbSeparator className="text-white font-bold rtl:rotate-180" />
              <BreadcrumbItem>
                <Badge variant={(projectId && !blockNumber) ? "white" : "secondary" }>
                  <Link href="/ar/real-estate/2555545">سرايا البحيرات</Link>
                </Badge>
              </BreadcrumbItem>
            </>
          )}
          {blockNumber && (
            <>
              <BreadcrumbSeparator className="text-white font-bold rtl:rotate-180" />
              <BreadcrumbItem>
                <Badge variant="white">
                  <BreadcrumbPage>{t("Block")} {blockNumber}</BreadcrumbPage>
                </Badge>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default WebsiteTitleSec;