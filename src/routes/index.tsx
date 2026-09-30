import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Car,
  Search,
  Fuel,
  Gauge,
  Settings2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  Heart,
  ShieldCheck,
  BadgeCheck,
  Wrench,
  CreditCard,
  Clock3,
  Award,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

type CarItem = {
  id: number;
  brand: string;
  name: string;
  model: string;
  year: number;
  price: number;
  km: number;
  fuel: string;
  transmission: string;
  image: string;
  badge: string;
  featured?: boolean;
};

const cars: CarItem[] = [
  {
    id: 1,
    brand: "Porsche",
    name: "Porsche 911 Carrera S",
    model: "911 Carrera S",
    year: 2023,
    price: 689000,
    km: 12000,
    fuel: "Gasolina",
    transmission: "Automático",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop",
    badge: "Destaque",
    featured: true,
  },
  {
    id: 2,
    brand: "BMW",
    name: "BMW M4 Competition",
    model: "M4 Competition",
    year: 2024,
    price: 525000,
    km: 8500,
    fuel: "Gasolina",
    transmission: "Automático",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80&auto=format&fit=crop",
    badge: "Novo",
  },
  {
    id: 3,
    brand: "Mercedes",
    name: "Mercedes-Benz GLE 450",
    model: "GLE 450 AMG",
    year: 2023,
    price: 412000,
    km: 18000,
    fuel: "Híbrido",
    transmission: "Automático",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80&auto=format&fit=crop",
    badge: "Blindado",
  },
  {
    id: 4,
    brand: "Audi",
    name: "Audi RS e-tron GT",
    model: "RS e-tron GT",
    year: 2024,
    price: 598000,
    km: 5000,
    fuel: "Elétrico",
    transmission: "Automático",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80&auto=format&fit=crop",
    badge: "Elétrico",
    featured: true,
  },
  {
    id: 5,
    brand: "Range Rover",
    name: "Range Rover Velar P340",
    model: "Velar P340",
    year: 2022,
    price: 389000,
    km: 25000,
    fuel: "Gasolina",
    transmission: "Automático",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80&auto=format&fit=crop",
    badge: "Seminovo",
  },
  {
    id: 6,
    brand: "Tesla",
    name: "Tesla Model S Plaid",
    model: "Model S Plaid",
    year: 2024,
    price: 475000,
    km: 3200,
    fuel: "Elétrico",
    transmission: "Automático",
    image: "https://images.unsplash.com/photo-1617704548623-340376564e68?w=800&q=80&auto=format&fit=crop",
    badge: "1.99s 0-100",
  },
  {
    id: 7,
    brand: "Toyota",
    name: "Toyota Hilux GR-S",
    model: "Hilux GR Sport",
    year: 2023,
    price: 289000,
    km: 22000,
    fuel: "Diesel",
    transmission: "Automático",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80&auto=format&fit=crop",
    badge: "Mais vendida",
  },
  {
    id: 8,
    brand: "Ford",
    name: "Ford Mustang GT",
    model: "Mustang GT 5.0",
    year: 2023,
    price: 345000,
    km: 15000,
    fuel: "Gasolina",
    transmission: "Automático",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80&auto=format&fit=crop",
    badge: "V8",
  },
];

const brands = ["Todos", "Porsche", "BMW", "Mercedes", "Audi", "Range Rover", "Tesla", "Toyota", "Ford"];

function formatPrice(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}
function formatKm(v: number) {
  return `${v.toLocaleString("pt-BR")} km`;
}

function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [brand, setBrand] = useState("Todos");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const filtered = useMemo(() => {
    return cars.filter((c) => {
      const byBrand = brand === "Todos" || c.brand === brand;
      const byQuery = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.model.toLowerCase().includes(query.toLowerCase());
      return byBrand && byQuery;
    });
  }, [brand, query]);

  const toggleFav = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased selection:bg-red-600 selection:text-white">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap'); *{font-family:Inter,system-ui,sans-serif} h1,h2,h3,.display{font-family:Outfit,sans-serif}`}</style>

      {/* TOP BAR */}
      <div className="hidden md:flex bg-[#0f172a] text-slate-300 text-xs py-2 px-4 items-center justify-between">
        <div className="flex items-center gap-6 mx-auto w-full max-w-[1280px]">
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-red-500" /> Av. Paulista, 1000 — São Paulo • Seg a Sáb 8h-19h</span>
          <span className="hidden lg:flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-red-500" /> Atendimento online 24h</span>
          <div className="ml-auto flex items-center gap-4">
            <a href="tel:+5511999999999" className="flex items-center gap-1.5 hover:text-white transition"><Phone className="h-3.5 w-3.5" /> (11) 99999-9999</a>
            <a href="mailto:contato@autoprime.com.br" className="flex items-center gap-1.5 hover:text-white transition"><Mail className="h-3.5 w-3.5" /> contato@autoprime.com.br</a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 h-[72px] flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#0f172a] flex items-center justify-center text-white">
              <Car className="h-5 w-5" />
            </div>
            <div className="leading-none">
              <div className="display font-extrabold text-[20px] tracking-tight">AUTOPRIME</div>
              <div className="text-[11px] tracking-[0.2em] font-semibold text-slate-500">CONCESSIONÁRIA PREMIUM</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <a href="#inicio" className="hover:text-red-600 transition">Início</a>
            <a href="#estoque" className="hover:text-red-600 transition">Estoque</a>
            <a href="#financiamento" className="hover:text-red-600 transition">Financiamento</a>
            <a href="#sobre" className="hover:text-red-600 transition">Sobre</a>
            <a href="#contato" className="hover:text-red-600 transition">Contato</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1ebe5d] transition">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <button onClick={() => setShowForm(true)} className="hidden xl:inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-6 py-2.5 text-sm font-semibold text-white hover:bg-black transition">
              Agendar visita <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
            <a href="#inicio" onClick={() => setMobileOpen(false)} className="block py-2 font-medium">Início</a>
            <a href="#estoque" onClick={() => setMobileOpen(false)} className="block py-2 font-medium">Estoque</a>
            <a href="#financiamento" onClick={() => setMobileOpen(false)} className="block py-2 font-medium">Financiamento</a>
            <a href="#sobre" onClick={() => setMobileOpen(false)} className="block py-2 font-medium">Sobre</a>
            <a href="#contato" onClick={() => setMobileOpen(false)} className="block py-2 font-medium">Contato</a>
            <a href="https://wa.me/5511999999999" className="flex mt-2 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-semibold text-white">Chamar no WhatsApp</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="inicio" className="relative bg-[#0f172a]">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80&auto=format&fit=crop" alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-[#0f172a]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-4 md:px-6 pt-10 md:pt-16 pb-16 md:pb-20 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-semibold tracking-wide backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> ESTOQUE ATUALIZADO HOJE • 347 VEÍCULOS
            </div>
            <h1 className="display mt-5 text-[36px] md:text-[52px] font-extrabold leading-[0.95] tracking-tight">
              O carro dos seus <span className="text-red-500">sonhos</span> <br /> está aqui.
            </h1>
            <p className="mt-4 max-w-[560px] text-[15px] md:text-[17px] leading-relaxed text-slate-300">
              Seminovos periciados com laudo cautelar, garantia de 1 ano e financiamento em até <b className="text-white">60x com as melhores taxas</b>. Troca e avaliação na hora.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#estoque" className="inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-red-700 transition shadow-lg shadow-red-600/20">
                Ver estoque completo <ArrowUpRight className="h-4 w-4" />
              </a>
              <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-900 hover:bg-slate-100 transition">
                Simular financiamento
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6 max-w-[480px] border-t border-white/10 pt-6">
              <div>
                <div className="display text-2xl font-extrabold">4.9<Star className="inline h-4 w-4 fill-amber-400 text-amber-400 -mt-1 ml-1" /></div>
                <div className="text-xs text-slate-400">+2.400 avaliações Google</div>
              </div>
              <div>
                <div className="display text-2xl font-extrabold">12 anos</div>
                <div className="text-xs text-slate-400">de mercado premium</div>
              </div>
              <div>
                <div className="display text-2xl font-extrabold">18 mil+</div>
                <div className="text-xs text-slate-400">carros entregues</div>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[520px]">
            <div className="relative rounded-[28px] overflow-hidden bg-white p-2 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80&auto=format&fit=crop" alt="Porsche" className="h-[340px] md:h-[440px] w-full object-cover rounded-[20px]" />
              <div className="absolute left-6 bottom-6 right-6 rounded-2xl bg-white/95 backdrop-blur p-4 shadow-xl flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold tracking-widest text-red-600">OFERTA DA SEMANA</div>
                  <div className="display font-extrabold leading-none text-slate-900">Porsche 911 Carrera S</div>
                  <div className="text-xs text-slate-500">2023 • 12.000 km • Laudo aprovado</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 line-through">R$ 720.000</div>
                  <div className="display font-extrabold text-red-600 text-lg">{formatPrice(689000)}</div>
                  <button onClick={() => setSelectedCar(cars[0])} className="mt-1 inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">Ver detalhes <ChevronRight className="h-3 w-3" /></button>
                </div>
              </div>
            </div>
            <div className="hidden md:flex absolute -right-4 -bottom-4 bg-white rounded-2xl p-4 shadow-xl items-center gap-3 border border-slate-100">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><ShieldCheck className="h-5 w-5" /></div>
              <div>
                <div className="text-sm font-bold leading-none">Garantia 1 ano</div>
                <div className="text-xs text-slate-500">Motor e câmbio</div>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH BAR — agora fora do overflow: fica sobre a borda, sem ser cortada */}
        <div className="relative z-20 mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="translate-y-8 md:translate-y-10 rounded-[20px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.14)] border border-slate-200 p-3 md:p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busque por modelo, marca... ex: Porsche, Hilux, Elétrico"
                className="w-full h-12 rounded-full bg-slate-100 pl-10 pr-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-red-600/20 border border-transparent focus:border-red-200 transition"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
              {brands.slice(0, 6).map((b) => (
                <button
                  key={b}
                  onClick={() => setBrand(b)}
                  className={`whitespace-nowrap rounded-full px-5 h-12 text-sm font-semibold border transition ${brand === b ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 hover:border-slate-900"}`}
                >
                  {b}
                </button>
              ))}
            </div>
            <a href="#estoque" className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 h-12 px-7 text-sm font-bold text-white hover:bg-red-700 transition shrink-0">
              <Search className="h-4 w-4" /> Buscar
            </a>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="pt-14 md:pt-16 pb-6 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BadgeCheck, title: "Laudo cautelar aprovado", desc: "180 itens inspecionados" },
            { icon: CreditCard, title: "Financiamento 60x", desc: "Aprovação em 30 minutos" },
            { icon: Wrench, title: "Revisão garantida", desc: "Entrega com revisão completa" },
            { icon: Award, title: "Loja 5 estrelas", desc: "Referência no Brasil" },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl bg-white border border-slate-200 p-4 flex gap-3 items-start">
              <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0"><f.icon className="h-5 w-5" /></div>
              <div>
                <div className="text-sm font-bold leading-tight">{f.title}</div>
                <div className="text-xs text-slate-500">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ESTOQUE */}
      <section id="estoque" className="py-8 md:py-10 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 text-red-600 px-3 py-1 text-xs font-bold tracking-widest">ESTOQUE PREMIUM</div>
              <h2 className="display mt-3 text-[28px] md:text-[36px] font-extrabold tracking-tight leading-none">Escolha seu próximo carro</h2>
              <p className="mt-2 text-sm text-slate-500">Todos com procedência, KM original e garantia. Filtre por marca ou busque pelo modelo.</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500">{filtered.length} veículos encontrados</span>
              <div className="hidden md:flex items-center gap-2 ml-3">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBrand(b)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold border ${brand === b ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 hover:bg-slate-50"}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((car) => (
              <div key={car.id} className="group rounded-[20px] bg-white border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all flex flex-col">
                <div className="relative h-[190px] overflow-hidden bg-slate-100">
                  <img src={car.image} alt={car.name} className="h-full w-full object-cover group-hover:scale-[1.05] transition duration-500" />
                  <div className="absolute left-3 top-3 flex gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide ${car.featured ? "bg-amber-400 text-slate-900" : "bg-slate-900 text-white"}`}>{car.badge}</span>
                    {car.fuel === "Elétrico" && <span className="rounded-full bg-emerald-500 text-white px-2.5 py-1 text-[11px] font-bold">Elétrico</span>}
                  </div>
                  <button onClick={() => toggleFav(car.id)} className={`absolute right-3 top-3 h-8 w-8 rounded-full backdrop-blur bg-white/90 border flex items-center justify-center hover:bg-white transition ${favorites.includes(car.id) ? "text-red-600 border-red-200" : "text-slate-700 border-white"}`}>
                    <Heart className={`h-4 w-4 ${favorites.includes(car.id) ? "fill-red-600" : ""}`} />
                  </button>
                  <div className="absolute right-3 bottom-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-semibold flex items-center gap-1 border border-white">
                    <Gauge className="h-3.5 w-3.5" /> {formatKm(car.km)}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="text-[11px] font-bold tracking-widest text-slate-500">{car.brand.toUpperCase()} • {car.year}</div>
                  <div className="display font-bold leading-tight line-clamp-1">{car.name}</div>
                  <div className="text-xs text-slate-500">{car.model}</div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                    <span className="rounded-full bg-slate-100 px-2 py-1.5 flex items-center justify-center gap-1 font-medium"><Calendar className="h-3 w-3" /> {car.year}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1.5 flex items-center justify-center gap-1 font-medium"><Fuel className="h-3 w-3" /> {car.fuel}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1.5 flex items-center justify-center gap-1 font-medium"><Settings2 className="h-3 w-3" /> {car.transmission}</span>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <div className="text-xs text-slate-500">A partir de</div>
                      <div className="display text-xl font-extrabold leading-none">{formatPrice(car.price)}</div>
                      <div className="text-[11px] text-slate-500">ou 60x de {formatPrice(Math.round(car.price / 60))}</div>
                    </div>
                    <button onClick={() => setSelectedCar(car)} className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-black transition shrink-0">
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>

                  <button onClick={() => setSelectedCar(car)} className="mt-3 w-full rounded-full bg-red-600 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition">Ver detalhes</button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-center bg-white">
              <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center"><Search className="h-6 w-6 text-slate-500" /></div>
              <div className="mt-3 font-bold">Nenhum veículo encontrado</div>
              <div className="text-sm text-slate-500">Tente limpar os filtros ou buscar por outro termo</div>
              <button onClick={() => { setBrand("Todos"); setQuery(""); }} className="mt-4 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white">Limpar filtros</button>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold hover:border-slate-900 transition">
              Não achou o que queria? Fale com um consultor <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FINANCIAMENTO */}
      <section id="financiamento" className="py-10 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 text-xs font-bold tracking-widest">FINANCIAMENTO FACILITADO</div>
            <h2 className="display mt-3 text-[28px] md:text-[36px] font-extrabold leading-none tracking-tight">Aprovação rápida, <span className="text-red-600">entrada facilitada</span></h2>
            <p className="mt-3 text-sm md:text-[15px] text-slate-600 leading-relaxed">Trabalhamos com os principais bancos. Simule agora sem compromisso e receba sua proposta em até 30 minutos pelo WhatsApp. Aceitamos seu usado na troca com a melhor avaliação.</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center"><CreditCard className="h-4 w-4" /></div>
                <div className="mt-2 text-sm font-bold">Até 60x</div>
                <div className="text-xs text-slate-500">Taxas a partir de 0,89% a.m.</div>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center"><BadgeCheck className="h-4 w-4" /></div>
                <div className="mt-2 text-sm font-bold">Entrada em 2x</div>
                <div className="text-xs text-slate-500">No cartão sem juros</div>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center"><ShieldCheck className="h-4 w-4" /></div>
                <div className="mt-2 text-sm font-bold">Garantia estendida</div>
                <div className="text-xs text-slate-500">Até 2 anos opcional</div>
              </div>
            </div>
            <button onClick={() => setShowForm(true)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-red-700 transition">Simular agora — resposta em 30 min <ChevronRight className="h-4 w-4" /></button>
          </div>

          <div className="rounded-[24px] bg-[#0f172a] p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-600/20 blur-2xl" />
            <div className="text-sm font-bold tracking-widest text-red-400">SIMULADOR RÁPIDO</div>
            <div className="mt-1 display text-2xl font-extrabold">Quanto fica a parcela?</div>
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Valor do veículo</label>
                <div className="mt-1 rounded-xl bg-white text-slate-900 px-4 py-3 font-bold">R$ 250.000</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Entrada</label>
                  <div className="mt-1 rounded-xl bg-white/10 border border-white/15 px-4 py-3 font-bold">R$ 50.000</div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Prazo</label>
                  <div className="mt-1 rounded-xl bg-white/10 border border-white/15 px-4 py-3 font-bold">60x</div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-4 text-slate-900 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Parcela estimada</div>
                  <div className="display text-2xl font-extrabold">R$ 4.280<span className="text-sm font-medium text-slate-500">/mês</span></div>
                </div>
                <button onClick={() => setShowForm(true)} className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white">Quero essa parcela</button>
              </div>
              <div className="text-[11px] text-slate-400 text-center">* Simulação ilustrativa. Sujeito à análise de crédito.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-12 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=900&q=80&auto=format&fit=crop" alt="Showroom" className="rounded-[24px] h-[420px] w-full object-cover" />
            <div className="absolute -bottom-6 -right-2 md:right-6 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 flex items-center gap-4 max-w-[300px]">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop" alt="" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <div className="text-sm font-bold">Gabriel Carvalho</div>
                <div className="text-xs text-slate-500">Diretor • AutoPrime desde 2012</div>
                <div className="flex gap-0.5 mt-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /></div>
              </div>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-bold tracking-widest">SOBRE A AUTOPRIME</div>
            <h2 className="display mt-3 text-[28px] md:text-[36px] font-extrabold leading-none tracking-tight">12 anos sendo a <span className="text-red-600">concessionária</span> mais premiada de SP</h2>
            <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-slate-600">Showroom de 2.500m² na Av. Paulista, oficina própria e entrega técnica. Cada carro passa por perícia completa, higienização premium e revisão de 180 itens. Transparência total: laudo cautelar, histórico e garantia por escrito.</p>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl bg-white border border-slate-200 p-4"><div className="display text-2xl font-extrabold">4.9/5</div><div className="text-xs text-slate-500">Google Reviews</div></div>
              <div className="rounded-2xl bg-white border border-slate-200 p-4"><div className="display text-2xl font-extrabold">98%</div><div className="text-xs text-slate-500">Clientes indicam</div></div>
              <div className="rounded-2xl bg-white border border-slate-200 p-4"><div className="display text-2xl font-extrabold">24h</div><div className="text-xs text-slate-500">Para avaliar seu usado</div></div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#estoque" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-black transition">Conhecer estoque <ChevronRight className="h-4 w-4" /></a>
              <a href="https://wa.me/5511999999999" className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-6 py-3 text-sm font-bold hover:border-slate-900 transition">Falar com consultor</a>
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-10 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="display text-xl md:text-2xl font-extrabold">O que nossos clientes dizem</h3>
            <div className="hidden md:flex items-center gap-1 text-sm font-semibold"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.9 em 2.400+ avaliações</div>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              { name: "Rafael Mendes", car: "Comprou BMW M4", text: "Experiência impecável. Carro exatamente como anunciado, laudo completo e entrega com tanque cheio. Já indiquei 3 amigos." },
              { name: "Camila Duarte", car: "Comprou Range Rover Velar", text: "Financiamento aprovado em 20 minutos e pegaram meu usado por um valor ótimo. Atendimento nota 1000!" },
              { name: "Diego Oliveira", car: "Comprou Porsche 911", text: "Showroom lindo, transparência total. Senti segurança do início ao fim. Melhor concessionária premium que já fui." },
            ].map((d) => (
              <div key={d.name} className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                <div className="flex gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /><Star className="h-4 w-4 fill-amber-400 text-amber-400" /><Star className="h-4 w-4 fill-amber-400 text-amber-400" /><Star className="h-4 w-4 fill-amber-400 text-amber-400" /><Star className="h-4 w-4 fill-amber-400 text-amber-400" /></div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">"{d.text}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">{d.name.split(" ").map(n=>n[0]).join("")}</div>
                  <div><div className="text-sm font-bold leading-none">{d.name}</div><div className="text-xs text-slate-500">{d.car}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-12 bg-[#0f172a] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-[1280px] px-4 md:px-6 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-bold tracking-widest">FALE COM A GENTE</div>
            <h2 className="display mt-3 text-[30px] md:text-[36px] font-extrabold leading-none">Visite nosso showroom <br /> ou fale agora no <span className="text-red-500">WhatsApp</span></h2>
            <p className="mt-3 text-sm text-slate-300 max-w-[520px]">Av. Paulista, 1000 — Bela Vista, São Paulo • Estacionamento próprio e valet. Atendimento todos os dias 8h-19h.</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3"><div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center"><Phone className="h-4 w-4" /></div> (11) 99999-9999 • (11) 98888-8888</div>
              <div className="flex items-center gap-3"><div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center"><Mail className="h-4 w-4" /></div> contato@autoprime.com.br</div>
              <div className="flex items-center gap-3"><div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center"><MapPin className="h-4 w-4" /></div> Av. Paulista, 1000 — São Paulo/SP — CEP 01310-100</div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#1ebe5d] transition"><MessageCircle className="h-4 w-4" /> Chamar no WhatsApp</a>
              <a href="tel:+5511999999999" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-900 hover:bg-slate-100 transition"><Phone className="h-4 w-4" /> Ligar agora</a>
            </div>
          </div>

          <div className="rounded-[24px] bg-white p-6 text-slate-900">
            {!formSent ? (
              <>
                <div className="display text-xl font-extrabold">Agende sua visita ou simulação</div>
                <p className="text-sm text-slate-500">Resposta em até 15 minutos no horário comercial.</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSent(true);
                    setTimeout(() => setShowForm(false), 2000);
                  }}
                  className="mt-5 space-y-3"
                >
                  <input required placeholder="Seu nome" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:bg-white focus:border-slate-900" />
                  <input required placeholder="WhatsApp (11) 99999-9999" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:bg-white focus:border-slate-900" />
                  <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:bg-white focus:border-slate-900">
                    <option>Tenho interesse em...</option>
                    <option>Comprar um carro</option>
                    <option>Vender meu carro / troca</option>
                    <option>Financiamento</option>
                  </select>
                  <textarea placeholder="Mensagem (opcional)" rows={3} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:bg-white focus:border-slate-900 resize-none" />
                  <button type="submit" className="w-full rounded-full bg-red-600 py-3.5 text-sm font-bold text-white hover:bg-red-700 transition">Enviar mensagem</button>
                  <div className="text-[11px] text-center text-slate-500">Ao enviar você concorda com nossa política de privacidade.</div>
                </form>
              </>
            ) : (
              <div className="py-10 text-center">
                <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><BadgeCheck className="h-7 w-7" /></div>
                <div className="mt-3 display text-xl font-extrabold">Mensagem enviada!</div>
                <div className="text-sm text-slate-500">Nossa equipe vai te chamar no WhatsApp em poucos minutos.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#020617] text-slate-400">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 py-10 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 text-white">
              <div className="h-9 w-9 rounded-xl bg-white text-slate-900 flex items-center justify-center"><Car className="h-5 w-5" /></div>
              <div className="leading-none"><div className="display font-extrabold tracking-tight -translate-y-0.5">AUTOPRIME</div><div className="text-[11px] tracking-[0.18em] text-slate-400 mt-1">CONCESSIONÁRIA PREMIUM</div></div>
            </div>
            <p className="mt-3 text-sm leading-relaxed">A concessionária premium mais bem avaliada de São Paulo. Carros periciados, garantia e as melhores condições de financiamento.</p>
            <div className="mt-4 flex gap-2">
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Navegação</div>
            <div className="mt-3 space-y-2 text-sm">
              <a href="#inicio" className="block hover:text-white">Início</a>
              <a href="#estoque" className="block hover:text-white">Estoque</a>
              <a href="#financiamento" className="block hover:text-white">Financiamento</a>
              <a href="#sobre" className="block hover:text-white">Sobre nós</a>
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Ajuda</div>
            <div className="mt-3 space-y-2 text-sm">
              <a href="#" className="block hover:text-white">Laudo cautelar</a>
              <a href="#" className="block hover:text-white">Garantia estendida</a>
              <a href="#" className="block hover:text-white">Avaliação do seu usado</a>
              <a href="#" className="block hover:text-white">Política de privacidade</a>
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Newsletter</div>
            <p className="mt-3 text-sm">Receba ofertas exclusivas antes de todo mundo.</p>
            <div className="mt-3 flex gap-2">
              <input placeholder="Seu e-mail" className="flex-1 rounded-full bg-white/10 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/30" />
              <button className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition">Ok</button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs">
          © {new Date().getFullYear()} AutoPrime Concessionária Premium — CNPJ 12.345.678/0001-99 • Todos os direitos reservados • Desenvolvido com ♥ em São Paulo
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center text-white hover:scale-105 transition">
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* MODAL CAR */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setSelectedCar(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-[760px] max-h-[90vh] overflow-auto rounded-[24px] bg-white shadow-2xl">
            <button onClick={() => setSelectedCar(null)} className="absolute right-4 top-4 z-10 h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center"><X className="h-4 w-4" /></button>
            <img src={selectedCar.image} alt={selectedCar.name} className="h-[280px] w-full object-cover" />
            <div className="p-6">
              <div className="text-xs font-bold tracking-widest text-red-600">{selectedCar.brand.toUpperCase()} • {selectedCar.year} • {formatKm(selectedCar.km)}</div>
              <div className="display text-2xl font-extrabold">{selectedCar.name}</div>
              <div className="text-sm text-slate-500">{selectedCar.model} • {selectedCar.fuel} • {selectedCar.transmission}</div>

              <div className="mt-4 grid grid-cols-4 gap-3">
                {[
                  { k: "Ano", v: String(selectedCar.year) },
                  { k: "KM", v: formatKm(selectedCar.km) },
                  { k: "Combustível", v: selectedCar.fuel },
                  { k: "Câmbio", v: selectedCar.transmission },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
                    <div className="text-[11px] font-bold tracking-widest text-slate-500">{s.k.toUpperCase()}</div>
                    <div className="text-sm font-bold">{s.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-slate-900 text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Valor à vista</div>
                  <div className="display text-2xl font-extrabold">{formatPrice(selectedCar.price)}</div>
                  <div className="text-xs text-slate-400">60x de {formatPrice(Math.round(selectedCar.price / 60))} • Aceita troca</div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <a href={`https://wa.me/5511999999999?text=Olá! Tenho interesse no ${selectedCar.name} ${selectedCar.year}`} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white">WhatsApp <MessageCircle className="h-4 w-4" /></a>
                  <button onClick={() => { setSelectedCar(null); setShowForm(true); }} className="flex-1 sm:flex-none rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900">Simular</button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Laudo cautelar aprovado • Garantia de 1 ano motor e câmbio • Documentação em dia</div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowForm(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-[520px] rounded-[24px] bg-white p-6 shadow-2xl max-h-[90vh] overflow-auto">
            <button onClick={() => setShowForm(false)} className="absolute right-4 top-4 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center"><X className="h-4 w-4" /></button>
            {!formSent ? (
              <>
                <div className="display text-xl font-extrabold">Fale com um consultor AutoPrime</div>
                <p className="text-sm text-slate-500">Preencha e retornamos em até 15 minutos.</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSent(true);
                    setTimeout(() => {
                      setFormSent(false);
                      setShowForm(false);
                    }, 2500);
                  }}
                  className="mt-4 space-y-3"
                >
                  <input required placeholder="Seu nome" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:bg-white focus:border-slate-900" />
                  <input required placeholder="WhatsApp" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:bg-white focus:border-slate-900" />
                  <input placeholder="Carro de interesse (opcional)" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:bg-white focus:border-slate-900" />
                  <button type="submit" className="w-full rounded-full bg-red-600 py-3.5 text-sm font-bold text-white hover:bg-red-700 transition">Enviar agora</button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><BadgeCheck className="h-7 w-7" /></div>
                <div className="mt-3 display text-xl font-extrabold">Recebemos seu contato!</div>
                <div className="text-sm text-slate-500">Um consultor vai te chamar no WhatsApp agora mesmo.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
