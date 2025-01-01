import React from 'react'

export const Layout = () => {

  return (
    
    <div className=" mx-auto  min-h-sceen">
            
        <div className="flex-center flex-col gap-5 items-center h-[30rem] bg-color3 w-full">
            <h2 className="font-bold text-2xl mt-5 tracking-tight">
                Frequently Asked Questions (FAQ)
            </h2>
    
            <p>
             Everything You Need to Know for a Seamless Stay
            </p>
        </div>

        <div className="grid grid-cols-2 divide-y divide-y-reverse p-2  divide-neutral-200 max-w-[70rem] gap-10 mx-auto my-[5rem]">

            <div className="py-5 bg- border-[1px] border-transparent border-b-slate-200   border-1">
                <details className="group">
                    <summary className="flex justify-between items-center font-normal cursor-pointer list-none">
                        <span> What are the check-in and check-out times at Adhisthana Villas?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </summary>
                    <div className='text-neutral-600 mt-3 group-open:animate-fadeIn text-xs flex flex-col gap-2'>
                        <ul className="list-disc list-inside pl-4">
                            <li><span className='text-color1'>Check-In</span>: From 2:00 PM</li>
                            <li><span className='text-color1'>Check-Out</span>: By 12:00 PM</li>
                        </ul>
                        <p className=''>
                            If you require an early check-in or late check-out, please contact us in advance. These requests are subject to availability and may incur additional charges.
                        </p>
                    </div>
                </details>
            </div>

            <div className="py-5">
                <details className="group">
                    <summary className="flex justify-between items-center font-normal cursor-pointer list-none">
                        <span> What payment methods are accepted?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </summary>
                    <div className='text-neutral-600 mt-3 group-open:animate-fadeIn text-xs flex flex-col gap-2'>
                        <p>
                            Adhisthana Villas accepts various payment methods for your convenience:  
                        </p>
                        <ul className="list-disc list-inside pl-4">
                            <li><span className='text-color1'>Virtual Accounts (Bank Transfer)</span>: Transfer funds to a designated virtual bank account.</li>
                            <li><span className='text-color1'>Manual Bank Transfer</span>: Direct bank transfers to our account.</li>
                            <li><span className='text-color1'>Debit/Credit Cards</span>: Major debit and credit cards are accepted for secure payments.</li>
                            <li><span className='text-color1'>E-Wallets</span>: Payments via popular e-wallet platforms.</li>
                            <li><span className='text-color1'>Instant Payment Options</span>: Such as BCA OneKlik and other similar services.</li>
                        </ul>
                        <p className=''>
                            Please ensure that payment is completed by the deadline to confirm your reservation.
                        </p>
                    </div>
                </details>
            </div>


            <div className="py-5">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span> Can I get a refund for my subscription?</span>
                        <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
    </svg>
                </span>
                    </summary>
                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        We offers a 30-day money-back guarantee for most of its subscription plans. If you are not
                        satisfied with your subscription within the first 30 days, you can request a full refund. Refunds
                        for subscriptions that have been active for longer than 30 days may be considered on a case-by-case
                        basis.
                    </p>
                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span> How do I cancel my subscription?</span>
                        <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
    </svg>
                </span>
                    </summary>
                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        To cancel your We subscription, you can log in to your account and navigate to the
                        subscription management page. From there, you should be able to cancel your subscription and stop
                        future billing.
                    </p>
                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span> Can I try this platform for free?</span>
                        <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
    </svg>
                </span>
                    </summary>
                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        We offers a free trial of its  platform for a limited time. During the trial period,
                        you will have access to a limited set of features and functionality, but you will not be charged.
                    </p>
                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span> How do I access   documentation?</span>
                        <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
    </svg>
                </span>
                    </summary>
                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        Documentation is available on the company's website and can be accessed by
                        logging in to your account. The documentation provides detailed information on how to use the ,
                        as well as code examples and other resources.
                    </p>
                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span> How do I contact support?</span>
                        <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
    </svg>
                </span>
                    </summary>
                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        If you need help with the platform or have any other questions, you can contact the
                        company's support team by submitting a support request through the website or by emailing
                        support@We.com.
                    </p>
                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span> Do you offer any discounts or promotions?</span>
                        <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
    </svg>
                </span>
                    </summary>
                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        We may offer discounts or promotions from time to time. To stay up-to-date on the latest
                        deals and special offers, you can sign up for the company's newsletter or follow it on social media.
                    </p>
                </details>
            </div>
            <div className="py-5">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span> How do we compare to other similar services?</span>
                        <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
    </svg>
                </span>
                    </summary>
                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        This platform is a highly reliable and feature-rich service that offers a wide range
                        of tools and functionality. It is competitively priced and offers a variety of billing options to
                        suit different needs and budgets.
                    </p>
                </details>
            </div>
        </div>
    </div>


  )
}
