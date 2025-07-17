import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  Leaf,
  Users,
  Award,
  Truck,
  Heart,
  Target,
  Eye,
  CheckCircle,
  Sprout,
  Tractor,
  Factory,
  Calendar,
  TrendingUp,
  Handshake,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/27673470687" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:shadow-green-500/50 hover:scale-110"
        >
          <MessageSquare className="w-6 h-6" />
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/tomato-hero.jpg"
            alt="Agrinema Farm team and facilities - About our South African agricultural enterprise"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-green-100 text-green-800 px-4 py-2 text-lg">Our Story • Est. 2022</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-6 leading-tight">
              About <span className="text-green-600">Agrinema Farm</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Pioneering sustainable agriculture in Limpopo Province, dedicated to food security, community development,
              and agricultural excellence in South Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <Badge className="mb-4 bg-green-100 text-green-800">Company Overview</Badge>
                <h2 className="text-4xl font-bold text-green-900 mb-6">
                  Transforming South African Agriculture Since 2022
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Agrinema Farm represents a new generation of South African agricultural enterprises, founded with the
                  vision of revolutionizing food production in Limpopo Province and contributing meaningfully to our
                  nation's food security landscape. Established in 2022 by a team of experienced agricultural
                  professionals, we have rapidly evolved from a startup venture into a trusted name in fresh produce,
                  quality poultry, and essential ice products.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Our journey began with a simple yet powerful belief: that South African communities deserve access to
                  fresh, affordable, high-quality food produced through sustainable and environmentally responsible
                  methods. This conviction drives every aspect of our operations, from the seeds we plant to the
                  products we deliver to your table.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Today, Agrinema Farm operates four specialized production facilities across Limpopo Province, each
                  optimized for specific crops and products. Our integrated approach to agriculture combines traditional
                  farming wisdom with cutting-edge technology, ensuring consistent quality, sustainable practices, and
                  reliable supply chains that serve both individual consumers and commercial partners.
                </p>
              </div>
              <div className="space-y-6">
                <Image
                  src="/poultry1.jpg"
                  alt="Agrinema Farm modern agricultural facilities and sustainable farming practices"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-green-200">
                    <CardContent className="p-4 text-center">
                      <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-green-900">Founded</h4>
                      <p className="text-gray-600">2022</p>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200">
                    <CardContent className="p-4 text-center">
                      <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-green-900">Locations</h4>
                      <p className="text-gray-600">4 Sites</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Mission, Vision, Values */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="text-center">
                  <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-green-900">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-center leading-relaxed">
                    To provide South African communities with fresh, affordable, high-quality agricultural products
                    while promoting sustainable farming practices, supporting local economic development, and
                    contributing to national food security through innovation, excellence, and community partnership.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-emerald-50 to-white">
                <CardHeader className="text-center">
                  <Eye className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-green-900">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-center leading-relaxed">
                    To become the leading agricultural enterprise in Limpopo Province and a recognized contributor to
                    South Africa's food security, known for sustainable practices, community impact, product quality,
                    and innovative farming solutions that benefit all stakeholders.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="text-center">
                  <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-green-900">Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700 text-sm">Quality Excellence</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700 text-sm">Sustainability</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700 text-sm">Community Focus</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700 text-sm">Innovation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700 text-sm">Integrity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700 text-sm">Affordability</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-600 text-white">Our Journey</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">The Agrinema Farm Story</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From vision to reality - how we've grown to become a trusted agricultural partner in Limpopo Province
              </p>
            </div>

            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <Badge className="mb-4 bg-green-100 text-green-800">2022 - Foundation Year</Badge>
                  <h3 className="text-2xl font-bold text-green-900 mb-4">The Vision Takes Root</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Agrinema Farm was born from the shared vision of experienced agricultural professionals who
                    recognized the urgent need for sustainable, community-focused farming in Limpopo Province. Our
                    founders, with decades of combined experience in South African agriculture, identified key
                    opportunities to address food security challenges while building a profitable, sustainable
                    enterprise.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The initial focus was on establishing our first production site at Xigalo, where we began
                    cultivating tomatoes, onions, and other essential vegetables. Even in our first year, we prioritized
                    quality over quantity, implementing sustainable farming practices and building relationships with
                    local communities and suppliers.
                  </p>
                </div>
                <div className="order-1 md:order-2">
                  <Image
                    src="/IMG_6115.jpg"
                    alt="Agrinema Farm foundation and early farming operations in 2022"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="/tomato6.jpg"
                    alt="Agrinema Farm expansion and diversification of agricultural operations"
                    width={600}
                    height={320}
                    className="rounded-2xl shadow-lg object-cover w-full h-80"
                  />
                </div>
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-800">2023 - Rapid Growth</Badge>
                  <h3 className="text-2xl font-bold text-green-900 mb-4">Expansion and Diversification</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Building on our initial success, 2023 marked a period of strategic expansion. We established our
                    second production site at Tshamutilikwa, specializing in squash and pepper production, and began
                    developing our poultry operations at Bunzhe. This diversification allowed us to serve a broader
                    range of customer needs while reducing operational risks.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    During this period, we also invested heavily in infrastructure, including irrigation systems,
                    storage facilities, and transportation capabilities. Our commitment to quality and reliability began
                    attracting wholesale partners and establishing Agrinema Farm as a trusted supplier in the regional
                    market.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <Badge className="mb-4 bg-green-100 text-green-800">2024 - Innovation & Excellence</Badge>
                  <h3 className="text-2xl font-bold text-green-900 mb-4">Leading Agricultural Innovation</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Today, Agrinema Farm operates as a fully integrated agricultural enterprise with four specialized
                    production sites. Our ice production facility at Tshivhulani serves commercial and residential
                    customers, while our comprehensive operations at Bunzhe include poultry production, seedling
                    nursery, and grain processing capabilities.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We've implemented advanced agricultural technologies, including precision irrigation, integrated
                    pest management, and sustainable soil health programs. Our commitment to innovation extends to our
                    business practices, with efficient supply chain management and customer service systems that ensure
                    reliable, timely delivery of quality products.
                  </p>
                </div>
                <div className="order-1 md:order-2">
                  <Image
                    src="/tomato-2.jpg"
                    alt="Modern Agrinema Farm facilities showcasing agricultural innovation and technology"
                    width={600}
                    height={320}
                    className="rounded-2xl shadow-lg object-cover w-full h-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-800">Our Approach</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
                Sustainable Agriculture for a Better Tomorrow
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive approach to farming combines traditional wisdom with modern technology to deliver
                exceptional results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Sprout className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-green-900">Sustainable Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center text-sm">
                    Implementing environmentally responsible farming methods that protect soil health, conserve water
                    resources, and promote biodiversity for long-term agricultural sustainability.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Tractor className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-green-900">Modern Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center text-sm">
                    Utilizing precision agriculture, advanced irrigation systems, and modern equipment to optimize crop
                    yields while minimizing environmental impact and resource consumption.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Factory className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-green-900">Quality Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center text-sm">
                    Rigorous quality assurance processes from seed to harvest, ensuring every product meets the highest
                    standards for freshness, safety, and nutritional value.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Handshake className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-green-900">Community Partnership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center text-sm">
                    Building strong relationships with local communities, suppliers, and customers to create shared
                    value and contribute to regional economic development.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Our Commitment to Food Security</h3>
                  <p className="text-green-100 leading-relaxed mb-6">
                    As a South African agricultural enterprise, we understand our responsibility in addressing national
                    food security challenges. Our diverse product portfolio, reliable supply chains, and commitment to
                    affordability directly contribute to ensuring that nutritious, fresh food is accessible to all
                    communities across Limpopo Province and beyond.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                      <h4 className="font-semibold">Growing Impact</h4>
                      <p className="text-sm text-green-100">Expanding production capacity</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-8 w-8 mx-auto mb-2" />
                      <h4 className="font-semibold">Community Focus</h4>
                      <p className="text-sm text-green-100">Supporting local development</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Image
                    src="/tomato3.jpg"
                    alt="Agrinema Farm contribution to South African food security and community development"
                    width={400}
                    height={300}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-600 text-white">Leadership Team</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
                Experienced Agricultural Professionals
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our leadership team brings decades of combined experience in South African agriculture, business
                management, and community development
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="border-green-200 bg-white hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-green-600" />
                  </div>
                  <CardTitle className="text-green-900">Agricultural Leadership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">
                    Our agricultural team consists of experienced professionals with deep knowledge of South African
                    farming conditions, crop management, and sustainable agricultural practices. They ensure optimal
                    production across all our facilities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-white hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-12 w-12 text-green-600" />
                  </div>
                  <CardTitle className="text-green-900">Quality Assurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">
                    Our quality assurance specialists maintain rigorous standards throughout our production processes,
                    ensuring every product meets safety regulations and exceeds customer expectations for freshness and
                    quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-white hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Truck className="h-12 w-12 text-green-600" />
                  </div>
                  <CardTitle className="text-green-900">Operations Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">
                    Our operations team manages logistics, supply chain coordination, and customer relationships,
                    ensuring efficient delivery and exceptional service for both wholesale and retail customers.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Join Our Growing Team</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We're always looking for passionate individuals who share our commitment to sustainable agriculture,
                quality excellence, and community development. Explore opportunities to grow with Agrinema Farm.
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                <Mail className="h-4 w-4 mr-2" />
                Career Opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Partner with Agrinema Farm?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Whether you're interested in wholesale partnerships, bulk orders, or learning more about our sustainable
              farming practices, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50">
                <Phone className="h-5 w-5 mr-2" />
                Call 067 347 0687
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-900 bg-transparent"
              >
                <Link href="/products" className="flex items-center">
                  <Leaf className="h-5 w-5 mr-2" />
                  View Our Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-950 dark:bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src="/fresh-logo.jpeg"
                    alt="Agrinema Farm Logo"
                    width={40}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                  <span className="text-2xl font-bold">Agrinema Farm</span>
                </div>
                <p className="text-green-200 mb-4 max-w-md">
                  Freshness rooted in Limpopo. From farm to table, committed to food security and community wellness
                  since 2022.
                </p>
                <div className="flex space-x-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-green-950 bg-transparent"
                  >
                    Facebook
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-green-950 bg-transparent"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <Link href="/about" className="block text-green-200 hover:text-white">
                    About Us
                  </Link>
                  <Link href="/products" className="block text-green-200 hover:text-white">
                    Our Products
                  </Link>
                  <Link href="/blog" className="block text-green-200 hover:text-white">
                    Blog
                  </Link>
                  <Link href="/contact" className="block text-green-200 hover:text-white">
                    Contact
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
                <div className="space-y-2 text-green-200">
                  <p>067 347 0687</p>
                  <p>068 801 1545</p>
                  <p>Limpopo Province</p>
                  <p>South Africa</p>
                </div>
              </div>
            </div>

            <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-200">
              <p>&copy; {new Date().getFullYear()} Agrinema Farm. All rights reserved. Proudly South African.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
