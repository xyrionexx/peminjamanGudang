'use client';

// REACT
import { useEffect, useState } from 'react';

// SHADCN
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// ICONS
import { Icon } from '@iconify/react/dist/iconify.js';
import { Heart, Share2, ShoppingCart, Minus, Plus } from 'lucide-react';

// IMPORT MILIK SENDIRI
import Footer from '@/components/footer';
import MainNavbar from '@/components/NavbarMain';
import { FoundBarang } from '@/types/global';
import { handle_AddToCart, handle_RemoveFromCart } from '@/scripts/cartHandler';
import { preconnect } from 'react-dom';

export default function ProductDetailPage() {
  // STATE
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [barang, setBarang] = useState<FoundBarang>();
  const [urlPathname, setURLPathname] = useState<string[]>();

  // STATIC DATA / NON STATE
  let breadCrumbPath: string = '';

  // HOOKS
  useEffect(() => {
    setBarang(JSON.parse(localStorage.getItem('barang') ?? '[]'));
  }, []);

  useEffect(() => {
    setURLPathname(window.location.pathname.split('/'));
  }, []);

  // HANDLERS
  const handleCartActions = () => {
    barang?.addedToCart ? handle_RemoveFromCart(barang.nama) : handle_AddToCart(barang!);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <div className="mb-20">
        <MainNavbar />
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 py-6">
        {/* BREADCRUMB */}
        <div className="mb-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {urlPathname?.map((path: string, index: number) => {
                if (path === '') return;

                breadCrumbPath += `/${path}`;
                return (
                  <div key={index} className={`flex flex-row items-center gap-2`}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={breadCrumbPath}
                        className={index === urlPathname.length - 1 ? 'text-green-500' : ''}
                      >
                        {path}
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    {index !== urlPathname.length - 1 && <BreadcrumbSeparator />}
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-card rounded-lg overflow-hidden">
              <img
                src={barang?.gambar || 'https://picsum.photos/seed/picsum/200'}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex overflow-x-auto gap-2">
              {Array.from({ length: 8 }).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 aspect-square w-36 bg-card rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src="https://placehold.co/200"
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* JUDUL / NAMA BARANG */}
            <div>
              <h1 className="text-3xl font-bold text-balance mb-2">{barang?.nama}</h1>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              {/* QUANTITY */}
              <div className="flex items-center space-x-4">
                <span className="font-medium">Kuantitas:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">Stok: 25 tersisa</span>
              </div>

              {/* ACTION */}
              <div className="flex space-x-3">
                {/* ORDER SEKARANG */}
                <Button
                  variant={'default'}
                  className="flex-1 bg-green-500 hover:bg-green-600 h-10 text-sm"
                  onClick={() => {}}
                  onMouseEnter={() => {}}
                >
                  <Icon icon="material-symbols:shopping-bag-outline" width="24" height="24" />
                  Pesan sekarang
                </Button>

                {/* MASUKKAN KE KERANJANG */}
                <Button
                  variant={'outline'}
                  className="flex-1 border-green-500 text-green-500 hover:bg-green-50 h-10 text-sm"
                  onClick={() => {
                    if (!barang) return;
                    handleCartActions();
                    setBarang((prev: FoundBarang | undefined) => {
                      if (!prev) return prev;

                      return {
                        ...prev,
                        addedToCart: !prev.addedToCart,
                      };
                    });
                  }}
                  size="lg"
                >
                  {barang?.addedToCart == undefined || !barang?.addedToCart ? (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Masukkan Keranjang
                    </>
                  ) : (
                    <>
                      <Icon icon="pepicons-pop:cart-off" width="20" height="20" />
                      Buang dari keranjang
                    </>
                  )}
                </Button>

                {/* WISHLIST */}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={isFavorited ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                </Button>

                {/* SHARE */}
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-5">
              {/* deskripsi */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Deskripsi Produk</h2>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-pretty">{barang?.desc}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Spesifikasi */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Spesifikasi</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="display">
                      <AccordionTrigger>Layar</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Ukuran</span>
                            <span>6.8 inci</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Resolusi</span>
                            <span>3120 x 1440 piksel</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Teknologi</span>
                            <span>Dynamic AMOLED 2X</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Refresh Rate</span>
                            <span>120Hz</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="camera">
                      <AccordionTrigger>Kamera</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Kamera Utama</span>
                            <span>200MP</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Ultra Wide</span>
                            <span>12MP</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Telephoto</span>
                            <span>50MP (5x zoom)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kamera Depan</span>
                            <span>12MP</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="performance">
                      <AccordionTrigger>Performa</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Chipset</span>
                            <span>Snapdragon 8 Gen 3 for Galaxy</span>
                          </div>
                          <div className="flex justify-between">
                            <span>RAM</span>
                            <span>12GB</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Storage</span>
                            <span>256GB</span>
                          </div>
                          <div className="flex justify-between">
                            <span>OS</span>
                            <span>Android 14, One UI 6.1</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
